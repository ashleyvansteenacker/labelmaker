'use strict';
var express = require("express");
var path = require("path");
var apphbs  = require('express-handlebars');
var bodyParser = require("body-parser");

var app = express();
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

// Import routers
var indexRouter = require("./routes/index");

// Routers
app.use('/', indexRouter);

// Set Project backbone
app.set("port",process.env.PORT || 3000);
app.engine('handlebars', apphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.set("views",path.join(__dirname, "views")); 
app.use(express.static('public'))

// Show serverstatus + port
app.listen(app.get("port"),function(){
    console.log("Server started on port " + app.get("port"));
});

