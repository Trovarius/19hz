'use strict'
const status = require('http-status');
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

    /** A better way to copy the uploaded file. **/
    var src = fs.createReadStream(tmp_path);
    var dest = fs.createWriteStream(target_path);
    src.pipe(dest);
    src.on('end', function() { res.redirect('/uploaded/nova'); });
    src.on('error', function(err) { res.render('error'); });

    res.redirect("/uploaded/"+ req.file.originalname);
  })

  app.get('/upload-form', (req, res, next) => {

    res.send('<form action="/upload" method="post" enctype="multipart/form-data">'+
        '<input type="file" name="audio">'+
        '<input type="submit" value="Upload">'+
        '</form>');
  })

  // here we get all the movies
  app.get('/uploaded/:name', (req, res, next) => {
    res.send(req.params.name);
  })

}
