var express= require("express");
var routes= require('./routes/api');
var bodyParser=require("body-parser");
var mongoose=require("mongoose");

var app=express();  //set up express app

//connect to mongodb
mongoose.connect('mongodb://localhost/ninjago');
mongoose.Promise=global.Promise;

//first middleware; path to static file
app.use(express.static('public'));      //static file from public folder; that's where we create our front end application

app.use(bodyParser.json()); //Body parser middleware;body parser should be initialized before route handlers

//Initialize routes; Middleware
app.use('/api',routes);   //after localhost:3000/api

//Error handling middleware
app.use(function(err,req,res,next){
    //console.log(err);
    res.status(422).send({error:err.message});   //sending an object ie. error msg to the client
});                                              // .status(422) to change status code

app.listen(3000, function(){
    console.log("Server is live.");
});