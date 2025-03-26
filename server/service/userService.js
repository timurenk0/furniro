/* eslint-disable no-undef */
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

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
            const { username, password } = userData;

            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(password, saltRounds);
            console.log("hashed pw:", hashedPassword);

            const newUser = new User({ username, password: hashedPassword });
            const savedUser = await newUser.save();
            return savedUser;
        } catch (error) {
            if (error.code === 11000 || (error.name === 'MongoError' && error.code === 11000) ||
                error.message.includes('duplicate key') || error.message.includes('E11000')) {
                throw new Error("Username already exists");
            }
            throw new Error(`Error adding a user: ${error.message}`);
        }
    }

    static async loginUser(username, password) {
        try {
            const user = await User.findOne({ username });

            if (!user) {
                throw new Error("User not found");
            }

            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                throw new Error("Invalid credentials");
            }

            const token = jwt.sign({
                id: user._id,
                username: user.username,
                role: user.role
            },
                process.env.JWT_SECRET,
                { expiresIn: "1h" }
            );

            return { token, user: username };
        } catch (error) {
            throw new Error(`Login failed ${error.message}`);
        }
    }
}

module.exports = UserService;