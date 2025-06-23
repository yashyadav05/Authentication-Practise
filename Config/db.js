const mongoose = require("mongoose")

const db = async()=>{
    try{
    await mongoose.connect(process.env.MONGO_URI)
    console.log("database is connected")
   }
   catch(err){
       console.log("Something went wrong")
       console.log(err)
       process.exit(1)
   }
}

module.exports = db