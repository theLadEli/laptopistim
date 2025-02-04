import jwt from "jsonwebtoken";
import dotenv from 'dotenv'

dotenv.config({ path: '../config/.env' });
const SECRET_KEY = process.env.JWT_SECRET; 

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    
    console.log("Received Auth Header:", authHeader);

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ error: "No token provided" });
    }

    const token = authHeader.split(" ")[1];
    console.log("Extracted Token:", token);

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        console.log("Decoded Token:", decoded);

        req.user = decoded; // Save the decoded user data
        next();
    } catch (err) {
        console.error("JWT Verification Error:", err);
        return res.status(401).json({ error: "Invalid token" });
    }
};

export default verifyToken;