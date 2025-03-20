/* eslint-disable no-undef */
const jwt = require("jsonwebtoken");

const authService = (req, res, next) => {

    const token = req.header("x-auth-token");

    if (!token) {
        return res.status(401).json({ error: "No token, authorization denied" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ error: "Token is invalid: " + error.message });
    }
}

const authorize = (roles = []) => {
    if (typeof roles === "string") {
        roles = [roles];
    }

    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({ error: "Unauthorized" });
        }

        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ error: "Forbidden" });
        }

        next();
    }
}

module.exports = { authService, authorize };