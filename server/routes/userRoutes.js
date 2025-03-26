/* eslint-disable no-undef */
const express = require("express");
const UserService = require("../service/userService");
const router = express.Router();
const { authService } = require("../service/authService")

router.get("/users", async (req, res) => {
    try {
        const users = await UserService.getAllUsers();
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post("/users", async (req, res) => {
    try {
        const newUser = await UserService.addUser(req.body);
        res.status(201).json(newUser);
    } catch (err) {
        // Check for various ways the username already exists error might appear
        if (err.message.includes("Username already exists") ||
            err.message.includes("duplicate key") ||
            err.message.includes("E11000")) {
            return res.status(400).json({ error: "Username already exists" });
        }
        return res.status(500).json({ error: err.message });
    }
});

router.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ error: "Username and password are required" });
        }

        const result = await UserService.loginUser(username, password);

        res.cookie("authToken", result.token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 3600000,
            sameSite: "strict"
        })

        console.log(result)
        res.json(result);
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
});

router.post("/logout", (req, res) => {
    res.clearCookie("authToken");
    res.json({ message: "Logged out succesfully" });
})

router.get("/auth/me", authService, (req, res) => {
    res.json({
        id: req.user._id,
        username: req.user.username,
        role: req.user.role
    });
});

module.exports = router;