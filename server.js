  var express = require('express');
  var app = express();
  var request = require('ejs');

  app.set('view engine', 'ejs');

  app.set('port', (process.env.PORT || 3000));
  app.use('/', express.static(__dirname + '/build'));
  app.listen(app.get('port'), function() {
    console.log('Server started: http://localhost:' + app.get('port') + '/#signup');
  });

var bodyParser = require('body-parser')
app.use( bodyParser.json() );      
app.use(bodyParser.urlencoded({
  extended: true
}));

var urlencodedParser = bodyParser.urlencoded({extended: false});

app.post('/signup', function(req, res) {
   res.redirect('/#login');
});

app.post('/login', function(req, res) {
   res.redirect('/#category');
});

app.get('/product', function(req, res) {
  res.redirect('/#product');
});
