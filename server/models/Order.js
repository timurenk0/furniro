/* eslint-disable no-undef */
const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",   // References the User model
        required: true
    },
    items: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",  // References the Product model
                required: true
            },
            quantity: { type: Number, required: true, min: 1 },
            price: { type: Number, required: true } // Price at time of purchase
        }
    ],
    subtotal: { type: Number, required: true },
    insuranceFee: { type: Number, required: true, default: 0 },
    deliveryFee: { type: Number, required: true, default: 0 },
    totalAmount: { type: Number, required: true },
    status: {
        type: String,
        enum: ["pending", "processing", "shipped", "delivered", "cancelled"],
        default: "pending"
    },
    shippingAddress: {
        street: { type: String },
        city: { type: String },
        state: { type: String },
        zipCode: { type: String },
        country: { type: String, default: "United States" }
    },
    paymentInfo: {
        method: { type: String, default: "credit_card" },
        transactionId: { type: String },
        status: { type: String, default: "pending" }
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

// Middleware to update `updatedAt` field on save
orderSchema.pre("save", function (next) {
    this.updatedAt = Date.now();
    next();
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;