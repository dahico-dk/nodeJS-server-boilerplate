
function sockets(server) {

    var io = require('socket.io').listen(server);
    io.on('connection', function (socket) { // Create a socket      
        socket.on('disconnect', function () {
            console.log('user disconnected');
        });
        socket.on('message', data => {
            //set data logic!
            socket.broadcast.emit(data);
          });
        
    });



}



module.exports = sockets;