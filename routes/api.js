var express=require("express");
var router= express.Router();
var Ninja=require('../models/ninja');



router.get('/ninjas', function(req,res,next){
    /* Ninja.find({}).then(function(ninja){    get request to find all ninjas
        res.send(ninja);
    }); */
    Ninja.aggregate().near({
        near:{type: "Point", coordinates:[parseFloat(req.query.lng), parseFloat(req.query.lat)]},
        maxDistance: 1000000,
        sphercal: true,
    distanceField:"dist.calculated"}).then(function(ninja){
             res.send(ninja);
    });
    //res.send({type:'GET'});  checking by sending an object as response
});

//req.query.lng will return a string hence used parseFloat
//geoNear is a function to find ninja closest to the given coordinates
//maxDistance is in metre



router.post('/ninjas', function(req,res,next){
    //var ninja=new Ninja(req.body);  //new instance of Ninja is created with body objects.
    //ninja.save();                   //save is mongoose method to save it in the database
    //above 2 lines can be replaced by Ninja.create(req.body); it will create new instance and save it to the DB in one step 
    Ninja.create(req.body).then(function(ninja){  //.then() func runs only after save is complete
        res.send(ninja); 

    }).catch(next); 
});
//if .create() fails then whatever func is in the catch param is executed




router.put('/ninjas/:id', function(req,res,next){
    Ninja.findByIdAndUpdate({_id: req.params.id},req.body).then(function(){  //here ninja isn't put as param because it will be the older DB 
        Ninja.findOne({_id: req.params.id}).then(function(ninja){
            res.send(ninja);
        });
    });
    //res.send({type:'PUT'});
});




router.delete('/ninjas/:id', function(req,res,next){
    Ninja.findByIdAndRemove({_id: req.params.id}).then(function(ninja){
        res.send(ninja);
    });
    //res.send({type:'DELETE'});
});



module.exports= router;  //Since we export router we can now import it in another file