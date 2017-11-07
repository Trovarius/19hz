var express = require('express');
var fs = require('fs');

var app = express();

app.use('/public', express.static(__dirname + '/public'));

app.get('/',function(req,res){
	return res.redirect('/public/home.html');
});

app.get('/resources', function(req,res){
	var fileId = req.query.id;
	var file = __dirname + '/resources/' + fileId;

	fs.exists(file,function(exists){
		if(exists)
		{
            var stat = fs.statSync(file);

            res.writeHead(200, {
                'Content-Type': 'audio/mpeg',
                'Content-Length': stat.size
            });

			var rstream = fs.createReadStream(file);
			rstream.pipe(res);
		}
		else
		{
			res.send("Its a 404");
			res.end();
		}

	});
});

app.listen(3002, function(){
    console.log('Streamming app up and running!');
});
