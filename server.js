console.log("hellohohohooho wooooorld");


var express = require('express');


// app = application
var app = express();

// var server = app.listen(3000);
var port = process.env.PORT || 3000
var server = app.listen(port);


app.use(express.static('public'));

var socket = require('socket.io');

var io = socket(server);


io.sockets.on('connection',newConnection);

function newConnection(socket){ //callback
 console.log("new connection! " + socket.id);

 socket.on('channel', channelMsg);
 socket.on('pixel', pixelMsg);

 function channelMsg(data){
    //  console.log(data);
    socket.broadcast.emit('channel', data);
    }

    function pixelMsg(data){
        //  console.log(data);
        socket.broadcast.emit('pixel', data);
        }
    

}