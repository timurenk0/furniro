/* eslint-disable no-undef */
const Order = require("../models/Order");
const User = require("../models/User");
const Product = require("../models/Product");
const mongoose = require("mongoose");

class OrderService {
    static async getAllOrders(userId, status, limit) {
        try {
            let query = {};

            if (userId) query.userId = userId;
            if (status) query.status = status;

            let orderQuery = Order.find(query)
                .populate('userId', 'username email') // Get user details
                .populate('items.productId', 'name price imageURLs') // Get product details
                .sort({ createdAt: -1 }); // Latest first

            if (limit) orderQuery = orderQuery.limit(parseInt(limit));

            return await orderQuery;
        } catch (error) {
            throw new Error(`Error fetching orders: ${error.message}`);
        }
    }

    static async getOrderById(id) {
        try {
            if (!mongoose.Types.ObjectId.isValid(id)) {
                throw new Error("Invalid order ID format.");
            }

            return await Order.findById(id)
                .populate('userId', 'username email')
                .populate('items.productId', 'name price imageURLs type description');
        } catch (error) {
            throw new Error(`Error fetching order: ${error.message}`);
        }
    }

    static async getUserOrders(userId) {
        try {
            if (!mongoose.Types.ObjectId.isValid(userId)) {
                throw new Error("Invalid user ID format.");
            }

            return await Order.find({ userId })
                .populate('items.productId', 'name price imageURLs')
                .sort({ createdAt: -1 }); // Latest orders first
        } catch (error) {
            throw new Error(`Error fetching user orders: ${error.message}`);
        }
    }

    static async createOrder(orderData) {
        const session = await mongoose.startSession();
        session.startTransaction();

        try {
            // Verify the user exists
            const user = await User.findById(orderData.userId);
            if (!user) {
                throw new Error(`User with ID ${orderData.userId} not found`);
            }

            // Calculate total and verify products
            let subtotal = 0;
            const items = [];

            for (const item of orderData.items) {
                const product = await Product.findById(item.productId);
                if (!product) {
                    throw new Error(`Product with ID ${item.productId} not found`);
                }

                // Use current product price
                const price = product.price;
                subtotal += price * item.quantity;

                items.push({
                    productId: item.productId,
                    quantity: item.quantity,
                    price: price
                });
            }

            // Calculate fees (could be passed in or calculated here)
            const insuranceFee = orderData.insuranceFee || subtotal * 0.024;
            const deliveryFee = orderData.deliveryFee || 100;

            // Calculate total amount
            const totalAmount = subtotal + insuranceFee + deliveryFee;

            const newOrder = new Order({
                userId: orderData.userId,
                items: items,
                subtotal: subtotal,
                insuranceFee: insuranceFee,
                deliveryFee: deliveryFee,
                totalAmount: totalAmount,
                status: "pending"
            });

            const savedOrder = await newOrder.save({ session });
            await session.commitTransaction();

            return savedOrder;
        } catch (error) {
            await session.abortTransaction();
            throw new Error(`Error creating order: ${error.message}`);
        } finally {
            session.endSession();
        }
    }

    static async updateOrderStatus(id, status) {
        try {
            if (!mongoose.Types.ObjectId.isValid(id)) {
                throw new Error("Invalid order ID format.");
            }

            const validStatuses = ["pending", "processing", "shipped", "delivered", "cancelled"];
            if (!validStatuses.includes(status)) {
                throw new Error(`Invalid status. Must be one of: ${validStatuses.join(', ')}`);
            }

            return await Order.findByIdAndUpdate(
                id,
                { status: status, updatedAt: Date.now() },
                { new: true, runValidators: true }
            );
        } catch (error) {
            throw new Error(`Error updating order status: ${error.message}`);
        }
    }

    static async deleteOrder(id) {
        try {
            if (!mongoose.Types.ObjectId.isValid(id)) {
                throw new Error("Invalid order ID format.");
            }

            return await Order.findByIdAndDelete(id);
        } catch (error) {
            throw new Error(`Error deleting order: ${error.message}`);
        }
    }
}

// eslint-disable-next-line no-undef
module.exports = OrderService;