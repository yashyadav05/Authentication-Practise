const user = require("../Model/signupSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

// REGISTER
const userRegister = asyncHandler(async (req, res) => {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password || !role) {
        return res.status(400).json({ message: "All fields are mandatory." });
    }

    const checkUser = await user.findOne({ email });
    if (checkUser) {
        console.log(checkUser);
        return res.status(400).json({ success: false, message: "User already exists." });
    }

    const hashPassword = await bcrypt.hash(password, 10);
    console.log(hashPassword);

    const newUser = await user.create({
        name,
        email,
        password: hashPassword,
        role
    });

    res.status(201).json({
        success: true,
        message: "User Created Successfully.",
        user:newUser
    });
});

// LOGIN
const userLogin = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "All fields are mandatory." });
    }

    const userExist = await user.findOne({ email });
    if (!userExist) {
        return res.status(401).json({
            success: false,
            message: "User does not exist"
        });
    }

    const isPasswordMatch = await bcrypt.compare(password, userExist.password);
    if (!isPasswordMatch) {
        return res.status(403).json({
            success: false,
            message: "Incorrect password"
        });
    }

    const payload = {
        email: userExist.email,
        id: userExist._id,
        role: userExist.role
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "24h"
    });

    const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days
        httpOnly: true
    };

    res.cookie("Ntoken", token, options).status(200).json({
        success: true,
        user: {
            email: userExist.email,
            id: userExist._id,
            role: userExist.role
        },
        token,
        message: "User logged in successfully"
    });
});

//logout
const logout = asyncHandler(async(req,res)=>{
       res.clearCookie('token',{
        httpOnly:true,
        secure: process.env.NODE_ENV === 'production',
        sameSite:"strict"
       })
       res.status(200).json({
        success:true,
        message:"User logout successfully"
       })
})

module.exports = { userRegister, userLogin, logout };
