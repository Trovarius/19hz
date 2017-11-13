var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// Defining schema for our Todo API

//TODO:colletion of audio transcriptions
var TranscriptionSchema = Schema({
  transcription: String,
  rating: Number
});

var AudioSchema = Schema({
  file_name: String,
  path: String,
  // transcriptions: [TranscriptionSchema]
  completed: {
    type: Boolean,
    default: false
  },
  upload_date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Audio', AudioSchema);
