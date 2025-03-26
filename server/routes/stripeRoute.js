/* eslint-disable no-undef */
const express = require("express");
const PaymentService = require("../service/stripeService");
const router = express.Router();
const { authService } = require("../service/authService");

router.post("/create-checkout-session", authService, async (req, res) => {
    try {
        const userId = req.user.id;

        const session = await PaymentService.createCheckoutSession(userId);
        res.json({ sessionId: session.id });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;