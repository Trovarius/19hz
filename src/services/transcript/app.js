var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var helmet = require('helmet');
var http = require('http');

const Speech = require('@google-cloud/speech');
const fs = require('fs');

// Instantiates a client
const speechClient = new Speech.SpeechClient();

var mongoDB = "mongodb://mongo:27017/audio";

// mongoose.connect(mongoDB, {
//   useMongoClient: true
// });

//Get the default connection
// var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
// db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(helmet());

app.get('/', function(req, res){
  res.send(200, "Transcript Services - OK");
});

app.get('/:id', function(req, res){
  res.send(200, "In transcription ->" + req.params.name);


    const fileName = './resources/'+re.params.id+'.raw';

    var file = fs.createWriteStream(fileName);
    var request = http.get("http://upload/download/"+req.params.id, function(response) {
      response.pipe(file);
      // Reads a local audio file and converts it to base64
      const file = fs.readFileSync(fileName);
      const audioBytes = file.toString('base64');

      // The audio file's encoding, sample rate in hertz, and BCP-47 language code
      const audio = {
        content: audioBytes
      };
      const config = {
        encoding: 'LINEAR16',
        sampleRateHertz: 16000,
        languageCode: 'en-US'
      };
      const request = {
        audio: audio,
        config: config
      };

      // Detects speech in the audio file
      speechClient.recognize(request)
        .then((data) => {
          const response = data[0];
          const transcription = response.results.map(result =>
              result.alternatives[0].transcript).join('\n');
          console.log(`Transcription: ${transcription}`);
        })
        .catch((err) => {
          console.error('ERROR:', err);
        });
    });
});

// we add our API's to the express app
app.listen(3000, function(){
  console.log('Example app listening on port 3000!');
});
