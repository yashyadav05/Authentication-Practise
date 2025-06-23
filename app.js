//dotenv configration
require('dotenv').config()

//basic boilerplate code
const express = require("express")
const session = require("express-session")
const Routes = require("./Routes/routes")
const PORT = process.env.PORT || 2012
const app = express()

//Db connection
const dbConnection = require("./Config/db")
dbConnection()

//Cookie parser
const cookieParser = require("cookie-parser");
app.use(cookieParser());

// Middleware to parse json request body
app.use(express.json());                                 
app.use(express.urlencoded({ extended: true }));

//logout session
app.use(session({
    secret : process.env.JWT_SECRET || "Session Secret key",
    resave:false,
    saveUninitialized:false,
    cookie:{secure:true, httpOnly:true, sameSite: 'strict'}
}))

app.get("/",(req,res)=>{
    res.send("Hello World")
})

//connect to route
app.use("/api/v1",Routes)

app.listen(PORT,()=>console.log(`Server connected to http://localhost:${PORT}`))