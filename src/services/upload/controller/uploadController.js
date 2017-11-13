'use strict'

const status = require('http-status');
const Audio = require('../model/audioSchema');

var fs = require('fs');

module.exports = (app, upload) => {

  var type = upload.single('audio', {maxCount: 1});

  // here we get all the movies
  app.get('/uploads', (req, res, next) => {
    res.send("RecentLy UPLOAD AUDIOS");
  })

  app.post('/upload', type, (req, res, next) => {
    /** When using the "single"
    data come in "req.file" regardless of the attribute "name". **/
    var tmp_path = req.file.path;

    /** The original name of the uploaded file
       stored in the variable "originalname". **/
    var target_path = 'files/' + req.file.originalname;

    var audio = new Audio({
      file_name: req.file.originalname,
      path: req.file.path
    });

    audio.save((err) =>{
      console.log(err);
    });

    res.redirect("/transcript/"+ audio._id);
  })

  app.get('/upload-form', (req, res, next) => {

    res.send('<form action="/upload" method="post" enctype="multipart/form-data">'+
        '<input type="file" name="audio">'+
        '<input type="submit" value="Upload">'+
        '</form>');
  })

  // here we get all the movies
  app.get('/download/:id', (req, res, next) => {
    var audio = null;
     Audio.findOne({_id: req.params.id}, function(err, audio){
         if(err) res.send(404, 'File not found. Error:' + err);

         console.log("/app/"+ audio.path);
         res.download("/app/"+ audio.path)
    });

 })

 var readFilePromise = function(file) {
  return new Promise(function(ok, notOk) {
    fs.readFile(file, function(err, data) {
        if (err) {
          notOk(err)
        } else {
          ok(data)
        }
    })
  })
}

}
