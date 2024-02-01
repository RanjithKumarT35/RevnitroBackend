const jwt = require("jsonwebtoken");
const User = require("../models/usermodel");
const dotenv = require("dotenv");
dotenv.config();

const auth = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(500).json({
        errorMessage: "Unauthorized - Missing Token",
      });
    }
    jwt.verify(token, process.env.JWTSecret);
    next();
  } catch (err) {
    console.error("Error in auth middleware:", err.message);
    return res.status(500).json({
      errorMessage: "Internal Server Error",
    });
  }
};

module.exports = { auth };
