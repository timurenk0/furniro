/* eslint-disable no-undef */
const express = require("express");
const UserService = require("../service/userService");
const router = express.Router();

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
        res.status(500).json({ error: err.message });
    }
});

router.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ error: "Username and password are reuqired" });
        }

        const result = await UserService.loginUser(username, password);
        res.json(result);
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
})


module.exports = router;