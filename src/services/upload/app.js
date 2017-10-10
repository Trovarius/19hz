var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var helmet = require('helmet');
var uploadController = require('./controller/uploadController');
var multer  = require('multer')
var upload = multer({ dest: 'files/' })

//mongoose.connect("mongodb://mongo:27017");

var app = express();

app.use(helmet());
//app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
//app.use(bodyParser.json())

app.get('/', function(req, res){
  res.send("Upload Services - OK");
});

app.post('/profile', upload.single('audio'), function (req, res, next) {
  // req.file is the `avatar` file
  // req.body will hold the text fields, if there were any
  console.log(req.file);
})

// we add our API's to the express app
uploadController(app, upload);

app.listen(3000, function(){
  console.log('Example app listening on port 3000!');
});
