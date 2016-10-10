var net = require('net');
var fs = require('fs');

var path = '/tmp/js-server';

fs.unlink(path, function()
{

  var unixServer = net.createServer(function(socket)
  {
    console.log("Server created. Supposedly we have a socket???");
    socket.write("FFS this took a long fucking while");
  });
  
  

  unixServer.listen(path, function(){
    console.log("Server listening... apparently...");
  });



});
