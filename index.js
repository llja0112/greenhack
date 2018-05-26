var express = require('express');
var app = express();
var server = require('http').createServer(app);
var bodyParser = require('body-parser');
var fs = require('fs');

app.set('port', (process.env.PORT || 5000));

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.render('pages/index');
});

app.get('/farmer', function(request, response) {
  response.render('pages/farmer')
});

app.get('/harvest', function(request, response) {
  response.render('pages/harvest')
});

app.get('/receipt', function(request, response) {
  response.render('pages/receipt')
});

app.post('/savepicture', function(req, res){
  // console.log(req.body);
  // var img = req.body.photo;
  var stage = req.body.stage;
  var data = req.body.img.replace(/^data:image\/\w+;base64,/, "");
  var buf = new Buffer(data, 'base64');
  var filename = 'public/images/' + stage  + '.png';
  fs.writeFile(filename, buf);
  res.send('success');
});

server.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
