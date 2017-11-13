var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var helmet = require('helmet');
var uploadController = require('./controller/uploadController');
var multer  = require('multer')
var upload = multer({ dest: 'files/' })

var mongoDB = "mongodb://mongo:27017/audio";
mongoose.connect(mongoDB, {
  useMongoClient: true
});

//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(helmet());

app.get('/', function(req, res){
  res.send(200, "Upload Services - OK");
});

// we add our API's to the express app
uploadController(app, upload);

app.listen(3000, function(){
  console.log('Example app listening on port 3000!');
});
