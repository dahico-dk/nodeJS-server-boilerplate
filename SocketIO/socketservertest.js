const io = require('socket.io-client');
const config=require("../server-config.json");

var socket = io.connect(config["socketio-url"]);
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

