/* eslint-disable no-undef */
const express = require("express");
const OrderService = require("../service/orderService");
const router = express.Router();
const { authService, authorize } = require("../service/authService");

// Get all orders (admin only)
router.get("/orders", authService, authorize("admin"), async (req, res) => {
    try {
        const { status, limit } = req.query;
        const orders = await OrderService.getAllOrders(null, status, limit);
        res.json(orders);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get user orders
router.get("/user/orders", authService, async (req, res) => {
    try {
        const userId = req.user.id;
        const orders = await OrderService.getUserOrders(userId);
        res.json(orders);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get order by ID
router.get("/orders/:id", authService, async (req, res) => {
    try {
        const { id } = req.params;
        const order = await OrderService.getOrderById(id);

        // Check if the order belongs to the user or user is admin
        if (order.userId._id.toString() !== req.user.id && req.user.role !== "admin") {
            return res.status(403).json({ error: "Not authorized to view this order" });
        }

        res.json(order);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Create order directly (without cart)
router.post("/orders", authService, async (req, res) => {
    try {
        const orderData = req.body;
        // Ensure the user can only create orders for themselves
        orderData.userId = req.user.id;

        const order = await OrderService.createOrder(orderData);
        res.status(201).json(order);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update order status (admin only)
router.patch("/orders/:id/status", authService, authorize("admin"), async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        if (!status) {
            return res.status(400).json({ error: "Status is required" });
        }

        const order = await OrderService.updateOrderStatus(id, status);
        res.json(order);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete order (admin only)
router.delete("/orders/:id", authService, authorize("admin"), async (req, res) => {
    try {
        const { id } = req.params;
        const deletedOrder = await OrderService.deleteOrder(id);

        if (!deletedOrder) {
            return res.status(404).json({ error: "Order not found" });
        }

        res.json({ message: "Order deleted successfully", order: deletedOrder });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;