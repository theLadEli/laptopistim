import jwt from "jsonwebtoken";
import db from "../config/database.js";

export default async function account(req, res) {
    // 1️⃣ Get the token from headers
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ error: "Unauthorized: No token provided" });
    }

    const token = authHeader.split(" ")[1];

    try {
        // 2️⃣ Decrypt the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.userId;

        // 3️⃣ Fetch user details from DB
        const user = await db("users").where({ id: userId }).select("id", "firstName", "lastName", "email").first();

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        res.json(user);
    } catch (error) {
        return res.status(403).json({ error: "Forbidden: Invalid token" });
    }
};