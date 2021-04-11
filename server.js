console.log("hellohohohooho wooooorld");


var express = require('express');


// app = application
var app = express();

  var server = app.listen(3000);
var port = process.env.PORT || 3000
//var server = app.listen(port);


app.use(express.static('public'));

var socket = require('socket.io');

var io = socket(server);
io.sockets.on('connection',newConnection);

//node packages for twitter account
const Twit = require('twit');
const request = require('request'); //essential
const fs = require('fs');

var config = require('./config.js');
var T = new Twit(config);
var tweet = "here's an image of what I was drawing!";

function newConnection(socket){ //callback
 console.log("new connection! " + socket.id);

 socket.on('channel', channelMsg);
 socket.on('pixel', pixelMsg);
 socket.on('clear', clearMsg);
 socket.on('heartt', heartMsg);
 socket.on('tweet', tweetMsg);


 function channelMsg(data){
    //  console.log(data);
    socket.broadcast.emit('channel', data);
    }

    function heartMsg(data){
        socket.broadcast.emit('heartt', data);
    }

    function pixelMsg(data){
        //  console.log(data);
        socket.broadcast.emit('pixel', data);
        }
    
        function clearMsg(){
            socket.broadcast.emit('clear');
            } 

  function tweetMsg() {
    var filename = "public/picz/myCanvas.png";
    //encoding img
    var encoded_img = fs.readFileSync(filename, {encoding: 'base64'} );
		T.post('media/upload', {media_data: encoded_img}, insertMetaData);
		//}

    function insertMetaData(erroe,data,response){
			if(error){
				console.log(error);
			}
		 	
      var mediaIdStr = data.media_id_string; //tweeting the media of a specific id
		  var altText = "Here's what I drew! ";

					var meta_params = {meida_id: mediaIdStr, alt_text: {text: altText}};
					T.post('media/metadata/create', media_params, createdMedia);
		
					
					function createdMedia(error,data,response){
            if(error){
              console.log("you suck");
            }
						var tweet_params = {status: tweet, media_ids: mediaIdStr};
						T.post('statuses/update', tweet_params, tweeted); //post is a type of request, creating a NEW object
					}
				}
		
						function tweeted(error,data,response){
							if(error){
								console.log("you suck");
							}else {
							console.log("You're awesome!", data.text);
							}
						}
  }
}

