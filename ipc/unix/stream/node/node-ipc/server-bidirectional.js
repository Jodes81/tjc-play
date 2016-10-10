const ipc=require('node-ipc');

//var socketId = 'icp-test-js-server';

ipc.config.socketRoot = '/tmp/';
ipc.config.appspace = '';
ipc.config.rawBuffer = true;
ipc.config.id = 'js-server';
ipc.config.retry= 1500;

ipc.serve(
    function(){

        ipc.server.on(
            'connect',
            function(socket){
		console.log("Connected......");
                ipc.server.emit(
                    socket,
                    'hello'
                );
            }
	);

        ipc.server.on(
            'app.message',
            function(data,socket){
                console.log("Received Message...");
                ipc.server.emit(
                    socket,
                    'app.message',
                    {
                        id      : ipc.config.id,
                        message : data.message+' world!'
                    }
                );
            }
        );

        ipc.server.on(
            'data',
            function(data,socket){
                console.log("Received Data: " + data.toString());
		ipc.log('got a message', data, data.toString());
                ipc.server.emit(
                    socket,
                    'Wasssuuup'
                );
            }
        );

    }
);
