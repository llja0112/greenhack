var express = require('express');
var app = express();
var server = require('http').createServer(app);
var bodyParser = require('body-parser');
var fs = require('fs');
var imageAPI = require('./image_api.js');

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

app.get('/summary', function(request, response) {
  
  receiptData = JSON.parse(fs.readFileSync('./public/json/receipt.json'));
  farmerData = JSON.parse(fs.readFileSync('./public/json/farmer.json'));
  harvestData = JSON.parse(fs.readFileSync('./public/json/harvest.json'));
  dateData = new Date();

  response.render('pages/summary', 

      { date: dateData, 
        receipt: receiptData,
        farmer: farmerData,
        harvest: harvestData});
});

//app.post('/savepicture', function(req, res){
app.post('/procpicture', function(req, res){
  var stage = req.body.stage;
  var data = req.body.img.replace(/^data:image\/\w+;base64,/, "");
  console.log("phototype to node:" + stage);

  var buf = new Buffer(data, 'base64');
 // var callback = function(res){

 // }
  imageAPI.process(buf, stage, res);
  var filename = 'public/images/' + stage  + '.png';
  fs.writeFile(filename, buf);

});

server.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
