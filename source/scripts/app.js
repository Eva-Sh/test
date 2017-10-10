(function ($) {

 //загрузка шаблонов блоков регистрации/авторизации
  var templateSignUp = _.template($('#signup').html());
  var templateLogin = _.template($('#login').html());
  $('#category').hide();
//роут
  var ContactsRouter = Backbone.Router.extend({
      routes: {
        ""          : "signup",
        "signup"    : "signup",
        "login"     : "login",
        "category"  : "category",
        "product"   : "product"
      },
      signup: function signup() {
        $('.wrapper').append(templateSignUp);
        $('#category').hide();
        $('#products').hide();
      },

      login: function login() {
          $('.wrapper').append(templateLogin);
          $('.register-page').hide();
          $('.authorization-page').show();
          $('.wrapper-list-categories').hide();
          $('#category').hide();
          $('#products').hide();
      },

      category: function category() {
          $('#category').show();
          $('.register-page').hide();
          $('.authorization-page').hide();
          $('#products').hide();
      },
      product: function product() {
        $('#category').hide();
        $('.register-page').hide();
        $('.authorization-page').hide();
        $('#products').show();
      }
  });

  var contactsRouter = new ContactsRouter();

  Backbone.history.start();

//регистрация пользователя
  var registeredUser = Backbone.Model.extend({
      defaults: function defaults() {
          return {
              username: '',
              userpassword: ''
          };
      }
    });

    var registeredUsersList = Backbone.Collection.extend({
      model: registeredUser
    });

    var users = new registeredUsersList();


      $('.wrapper').on('click', '#button--login', function (event) {
        var userLogin = $('#username').val();
        var userPassword = $('#password').val();

        if ($('#username').val() == '' && $('#password').val() == '') {
            $(".message").css("opacity", "1");
            event.preventDefault();
        } else {
            $(".message").css("opacity", "0");
        }

        localStorage.setItem('userLogin', userLogin);
        localStorage.setItem('userPassword', userPassword);

    });


    var user = new registeredUser({ username: localStorage.getItem('userLogin'), userpassword: localStorage.getItem('userPassword') });

    users.add(user);

    console.log(users.toJSON());

    console.log(user.cid);



    //авторизация  пользователя
    $('.wrapper').on('click', '#button--authorization', function (event) {
      var userLoginAuthorization = $('#name').val();
      var userPasswordAuthorization = $('#password').val();
      if ($('#name').val() == localStorage.getItem('userLogin') && $('#password').val() == localStorage.getItem('userPassword')) {
        $(".authorization-page .message").css("opacity", "0");
      } else {
        event.preventDefault();
        $(".authorization-page .message").css("opacity", "1");
      }
    });


    //категории
    var carigories = [
        {
          categoryName: "category one",
          categoryID: "1",
          subcategoriesID: "01"
         },
        {
          categoryName: "category two",
          categoryID: "2",
          subcategoriesID: "02"
        },
        {
          categoryName: "category three",
          categoryID: "3",
          subcategoriesID: "03"
        },
        {
          categoryName: "category four",
          categoryID: "4",
          subcategoriesID: "04"
        }
    ];
    //подкатегории
    var subcategories = [
        {
          subcategoryName: "subcategory one",
          subcategoriesID: "01"
         },
        {
          subcategoryName: "subcategory two",
          subcategoriesID: "01"
        },
        {
          subcategoryName: "subcategory three",
          subcategoriesID: "03"
        },
        {
          subcategoryName: "subcategory four",
          subcategoriesID: "04"
        }
    ];

    var Categories = Backbone.Model.extend({
        defaults: {
            photo: ""
        }
    });

    var Directory = Backbone.Collection.extend({
        model: Categories
    });

    var CategoriesView = Backbone.View.extend({
        className: "btn-group",
        template: _.template($("#categoryTemplate").html()),

        render: function () {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        }
    });

    $('.wrapper').on('click', '.dropdown-toggle--category', function (event) {
      var textCategory = $(this).find('.category--hidden').text();
      console.log(textCategory);

      for (var key1 in subcategories)
         for (var key2 in subcategories [key1])
         if(subcategories [key1] [key2] ==  textCategory)
         var a = subcategories [key1] [key2];
          $(this).parents('.btn-group').find('.dropdown-menu li a').html(textCategory);
    });

    var DirectoryView = Backbone.View.extend({
        el: $(".list-catigories"),

        initialize: function () {
            this.collection = new Directory(carigories);
            this.render();
        },

        render: function () {
            _.each(this.collection.models, function (item) {
                this.renderCategories(item);
            }, this);
        },

        renderCategories: function (item) {
            var categoriesView = new CategoriesView({
                model: item
            });
            this.$el.append(categoriesView.render().el);
        }
    });

    var directory = new DirectoryView();

//продукты
    var productOne = [
        {
          productName: "product one",
          productID: "01"
         },
        {
          productName: "category two",
          productID: "01"
        },
        {
          productName: "category three",
          productID: "01"
        },
        {
          productName: "category four",
          productID: "01"
        }
    ];

    var Products = Backbone.Model.extend({
        defaults: {
            photo: ""
        }
    });

    var DirectoryProducts = Backbone.Collection.extend({
        model: Products
    });

    var ProductsView = Backbone.View.extend({
        className: "btn-group",
        template: _.template($("#productTemplate").html()),

        render: function () {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        }
    });

    var DirectoryProductsView = Backbone.View.extend({
        el: $(".list-products"),

        initialize: function () {
            this.collection = new DirectoryProducts(productOne);
            this.render();
        },

        render: function () {
            _.each(this.collection.models, function (item) {
                this.renderProducts(item);
            }, this);
        },

        renderProducts: function (item) {
            var productsView = new ProductsView({
                model: item
            });
            this.$el.append(productsView.render().el);
        }
    });

    var directoryProducts = new DirectoryProductsView();

} (jQuery));
