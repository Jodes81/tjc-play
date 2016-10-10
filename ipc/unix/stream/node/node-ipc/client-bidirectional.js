console.log(`hello`)

// https://www.npmjs.com/package/node-ipc
// https://troydhanson.github.io/network/Unix_domain_sockets.html

var ipc=require('node-ipc');

var socketId = 'icp-test-c-server';
ipc.config.id   = 'hello';
ipc.config.socketRoot = '/tmp/';
ipc.config.appspace = '';

ipc.config.retry= 1500;
ipc.connectTo(
  socketId, // string id of socket
  function(){
    ipc.of[socketId].on(
      'connect',
      function(){
        console.log("Connected!!");
        ipc.log('## connected to world ##'.rainbow, ipc.config.delay);
        ipc.of[socketId].emit(
          'message',  //any event or message type your server listens for 
          'hello'
        )
      }
    );
    ipc.of[socketId].on(
      'disconnect',
      function(){
        console.log("Disconnected!!");
        ipc.log('disconnected from world'.notice);
      }
    );
    ipc.of[socketId].on(
      'message',  //any event or message type your server listens for 
      function(data){
        console.log("Got a message!!");
        ipc.log('got a message from world : '.debug, data);
      }
    );
  }
);
 


console.log(`goodbye`)

/*
const http = require('http')  
const port = 8080
const requestHandler = (request, response) => {  
  console.log(request.url)
  response.end('Hello, I\'m your Node.js Server!!')
}
const server = http.createServer(requestHandler)
server.listen(port, (err) => {  
  if (err) {
    return console.log('something bad happened', err)
  }
  console.log(`server is listening on ${port}`)
})
*/
