/* eslint-disable no-undef */
const express = require("express");
const CartService = require("../service/cartService");
const OrderService = require("../service/orderService");
const router = express.Router();
const { authService } = require("../service/authService");

router.get("/cart", authService, async (req, res) => {
    try {
        const userId = req.user.id;
        const cart = await CartService.getCart(userId);
        res.json(cart);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post("/cart/items", authService, async (req, res) => {
    try {
        const { productId, quantity = 1 } = req.body;
        const userId = req.user.id;

        if (!productId) {
            return res.status(400).json({ error: "Product ID is required" });
        }
        const cart = await CartService.addItem(userId, productId, quantity);
        res.json(cart);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put("/cart/items/:productId", authService, async (req, res) => {
    try {
        const { productId } = req.params;
        const { quantity } = req.body;
        const userId = req.user.id;

        if (!quantity) {
            return res.status(400).json({ error: "Product quantity is required" });
        }

        const cart = await CartService.updateItemQuantity(userId, productId, quantity);
        res.json(cart);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

router.delete("/cart/items/:productId", authService, async (req, res) => {
    try {
        const { productId } = req.params;
        const userId = req.user.id;

        const cart = await CartService.removeItem(userId, productId);
        res.json(cart);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

router.delete("/cart", authService, async (req, res) => {
    try {
        const userId = req.user.id;
        const cart = await CartService.clearCart(userId);
        res.json({ message: "Cart cleared", cart });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

router.post("/cart/checkout", authService, async (req, res) => {
    try {
        const userId = req.user.id;
        const orderData = await CartService.convetToOrderData(userId);

        const order = await OrderService.createOrder(orderData);

        await CartService.clearCart(userId);

        res.status(201).json({
            message: "Order created successfully",
            order
        })
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

module.exports = router;