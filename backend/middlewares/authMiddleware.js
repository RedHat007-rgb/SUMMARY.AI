require("dotenv").config();
const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {
  try {
    const header = req.headers.token;
    if (!header || !header.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "Invalid or missing token",
      });
    }

    const token = header.split(" ")[1];
    if (!token) {
      return res.status(401).json({
        message: "Invalid token format",
      });
    }
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    req.user = {
      userId: decoded.userId,
    };

    next();
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({
        message: "Invalid token",
      });
    }
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        message: "Token has expired",
      });
    }

    console.error("Auth middleware error:", error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

module.exports = {
  authMiddleware,
};
