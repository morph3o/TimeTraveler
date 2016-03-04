var apn = require('apn');
var url = require("url");
var http = require("http")
var express = require("express");
var options = {cert: "development_de.freiraum.timetraveler.pem", key: "development_de.freiraum.timetraveler.pkey" };
var apnConnection = new apn.Connection(options);
var myDevice = new apn.Device("<1b9f10d5 74a41979 16fdbb05 375cfe4a 72b0bdf8 7b41cad5 72cd43fc 83297d8d>");



var app = express();
var server = http.Server(app);

app.get("/register", function(req, res){
	 var parsedToken = url.parse(req.url, true).query.token;
	 token = parsedToken;
	 console.log(parsedToken)
});

app.get("/send", function(req, res){
	

	var note = new apn.Notification();
	note.expiry = Math.floor(Date.now() / 1000) + 3600; // Expires 1 hour from now.
	note.badge = 3;
	note.sound = "ping.aiff";
	note.alert = "\uD83D\uDCE7 \u2709 You have a new message";
	note.payload = {'messageFrom': 'Lena'};
	apnConnection.pushNotification(note, myDevice);
	res.send("hi")
});

var port = process.env.PORT || 8888;
server.listen(port, function() {
  console.log("Running Server on " + port);
  
}, '0.0.0.0');

