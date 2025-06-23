const mongoose = require("mongoose")

const data = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
     email:{
        type:String,
        required:true,
        trim:true
    },
    password:{
       type:String,
        required:true, 
    },
    role:{
        type:String,
        enum:["Admin","Employee","Student"]
    }
})

module.exports = mongoose.model("singnup",data)