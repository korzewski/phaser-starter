var express = require('express');
var app = express();
var server = require('http').Server(app);

app.set('port', (process.env.PORT || 9000));
app.use(express.static(__dirname + '/build'));

server.listen(app.get('port'), function(){
	console.log('Server running at localhost: ', app.get('port'));
});