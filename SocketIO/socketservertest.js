const io = require('socket.io-client');
var socket = io.connect('http://localhost:3000/');

socket.on('message', onMessage );
socket.on('connect', onConnect );
socket.on('disconnect', onDisconnect );
socket.on('connect_error', onError );
socket.on('reconnect_error', onError );


function onConnect(){
    socket.send('Hello!');
    console.log("On Connect")
}

function onMessage(){
    console.log("On Message")
}

function onDisconnect(){
    console.log("On Disconnect")
}

function onError(error){
    console.log(error)
}

