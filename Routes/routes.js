const express = require("express")
const { userRegister,userLogin, logout } = require("../Controller/signup")
const { auth,isStudent,isAdmin } = require("../Middleware/auth")
const route = express.Router()

route.post("/signup",userRegister)
route.post("/login",userLogin)
route.post("/logout", auth, logout)

route.get("/test",auth, (req,res)=>{
    res.json({
        success:true,
        message:"Welcome to Authentication Route"
    })
})

route.get("/admin",auth, isAdmin, (req,res)=>{
    res.json({
        success:true,
        message:"Welcome to Admin Route"
    })
})

route.get("/student",auth, isStudent, (req,res)=>{
    res.json({
        success:true,
        message:"Welcome to Student Route"
    })
})

module.exports = route