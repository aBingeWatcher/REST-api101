const mongoose= require("mongoose");

const Schema= mongoose.Schema;

//create geolocation schema
const GeoSchema= new Schema({
    type:{
        type: String,
        default:"Point"
    },
    coordinates:{
        type: [Number],
        index: "2dsphere"
    }

});

//create ninja model and schema
const NinjaSchema= new Schema({
    name:{
        type: String,
        required:[true , 'Name field is required.']
    },
    rank:{
        type: String
    },
    available:{
        type: Boolean,
        default: false
    },
    geometry: GeoSchema
});

const Ninja=mongoose.model('ninja',NinjaSchema);  //here 'ninja' is the name of collection in database

module.exports= Ninja;