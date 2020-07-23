
function sockets(server) {

    var io = require('socket.io').listen(server);
    io.on('connection', function (socket) { // Create a socket     
        console.log("A user connected"); 
        socket.on('disconnect', function () {
            console.log('user disconnected');
        });
        socket.on('message', data => {
            //set data logic!
            console.log(data); 
            socket.broadcast.emit(data);
          });
        
    });



}



module.exports = sockets;