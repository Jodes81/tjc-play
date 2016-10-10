var net = require('net');
var fs = require('fs');

var path = '/tmp/c-server-writer';

var socket = net.createConnection(path, function()
{
	console.log("Created Connection!!");
});

socket.on("connect", function()
{
	console.log("Connected!!");
});

socket.on("data", function(data)
{
	console.log("Data received!!");
	console.log(data);
});
