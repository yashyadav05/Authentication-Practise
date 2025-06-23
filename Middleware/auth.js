const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
require("dotenv").config();

exports.auth = asyncHandler(async (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({
            success: false,
            message: "There is no token"
        });
    }

    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        console.log(decode);
        req.user = decode;
        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Invalid or expired token"
        });
    }
});

exports.isStudent = asyncHandler(async (req, res, next) => {
    if (req.user.role !== "Student") {
        return res.status(403).json({
            success: false,
            message: "Access denied: Only students allowed"
        });
    }
    next();
});

exports.isAdmin = asyncHandler(async (req, res, next) => {
    if (req.user.role !== "Admin") {
        return res.status(403).json({
            success: false,
            message: "Access denied: Only admins allowed"
        });
    }
    next();
});
