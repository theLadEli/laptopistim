import db from "../config/database.js";

const account = async (req, res) => {
    try {
        console.log("User ID from token:", req.user.id);
        const user = await db("users").where({ id: req.user.id }).first();
        
        if (!user) return res.status(404).json({ error: "User not found" });

        res.json({ 
            id: user.id,
            email: user.email,
            firstName: user.first_name,
            lastName: user.last_name,
            phone,
            city
        });
    } catch (err) {
        console.error("Error in /account:", err);
        res.status(500).json({ error: "Server error" });
    }
};

export default account;