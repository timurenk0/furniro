/* eslint-disable no-undef */
const User = require("../models/User");
const jwt = require("jsonwebtoken");

class UserService {
    static async getAllUsers() {
        try {
            return await User.find();
        } catch (error) {
            throw new Error(`Error fetching users: ${error.message}`)
        }
    }

    static async addUser(userData) {
        try {
            const newUser = new User(userData);
            const savedUser = await newUser.save();
            return savedUser;
        } catch (error) {
            throw new Error(`Error adding a user: ${error.message}`);
        }
    }

    static async loginUser(username, password) {
        try {
            const user = await User.findOne({ username });

            if (!user) {
                throw new Error("User not found");
            }

            const isMatch = password === user.password;

            if (!isMatch) {
                throw new Error("Invalid credentials");
            }

            return token = jwt.sign({
                id: user._id,
                username: user.username,
                role: user.role
            });

        } catch (error) {
            throw new Error(`Login failed ${error.message}`);
        }
    }
}

module.exports = UserService;