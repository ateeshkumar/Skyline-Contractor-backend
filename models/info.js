const mongoose=require("mongoose");
const Schema=mongoose.Schema;

const listingSchema=new Schema({

    userName:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    phoneNo:{
        type:Number,
        required:true,
    },
    age:{
        type:Number,
        required:true,
    },
    state:{
        type:String,
        required:true,
    },
    district:{
        type:String,
        required:true,
    },
    address:{
        type:String,
        required:true,
    },
    pinCode:{
        type:Number,
        required:true,
    },
    serviceType:{
        type:String,
        required:true,
    },
    serviceProvider:{
        type:String,
        required:true,
    },
    experience:{
        type:Number,
        required:true,
    },
    decription:{
        type:String,
        required:true,
    },
    qualification:{
        type:String,
        required:true,
    },
    chargesRate:{
        type:Number,
        required:true,
    },
    image:String
});

const Info=mongoose.model("Listing",listingSchema);
module.exports=Info;
