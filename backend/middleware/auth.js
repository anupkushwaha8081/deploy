

// token from cookies 
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.auth = (req, res, next) => {
    
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({
            success: false,
            message: "User not anupam authenticated",
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req._id = decoded.userId;
        next();
    } catch (error) {
        console.error(error);
        return res.status(403).json({
            success: false,
            message: "Invalid or expired token",
        });
    }
};

