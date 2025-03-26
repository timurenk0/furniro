/* eslint-disable no-undef */
const Cart = require("../models/Cart");
const Product = require("../models/Product");
const mongoose = require("mongoose");

class CartService {

    static async getCart(userId) {
        try {
            if (!mongoose.Types.ObjectId.isValid(userId)) {
                throw new Error("Invalid user ID format");
            }

            let cart = await Cart.findOne({ userId }).populate({ path: "items.product", select: "name price imageURLs" });

            if (!cart) {
                cart = new Cart({ userId, items: [] });
                await cart.save();
            }

            return cart;
        } catch (error) {
            throw new Error(`Error fetching cart: ${error.message}`);
        }
    }

    static async addItem(userId, productId, quantity = 1) {
        try {
            if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(productId)) {
                throw new Error("Invalid ID format");
            }

            const product = await Product.findById(productId);
            if (!product) {
                throw new Error(`Product with id ${productId} is not found`);
            }

            const cart = await this.getCart(userId);

            const existingItemIndex = cart.items.findIndex(
                item => item.product._id
                    ? item.product._id.toString() === productId
                    : item.product.toString() === productId
            );

            if (existingItemIndex > -1) {
                cart.items[existingItemIndex].quantity += quantity;
            } else {
                cart.items.push({ product, quantity });
            }

            await cart.save();

            return await this.getCart(userId);
        } catch (error) {
            throw new Error(`Error adding product to cart: ${error.message}`);
        }
    }

    static async updateItemQuantity(userId, productId, quantity) {
        try {
            if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(productId)) {
                throw new Error("Invalid ID format");
            }

            if (quantity < 1) {
                return await this.removeItem(userId, productId);
            }

            const cart = await this.getCart(userId);

            const existingItemIndex = cart.items.findIndex(
                item => item.product._id.toString() === productId
            );

            if (existingItemIndex === -1) {
                throw new Error("Item not found in the cart");
            }

            cart.items[existingItemIndex].quantity = quantity;
            await cart.save();

            return await this.getCart(userId);
        } catch (error) {
            throw new Error(`Error updating item quantity: ${error.message}`)
        }
    }

    static async removeItem(userId, productId) {
        try {
            if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(productId)) {
                throw new Error("Invalid ID format");
            }

            const cart = await this.getCart(userId);
            console.log("cart items before deletion:", cart.items)

            cart.items = cart.items.filter(
                item => item.product._id.toString() !== productId
            );

            console.log("cart items after deletion:", cart.items)

            await cart.save();

            return await this.getCart(userId);
        } catch (error) {
            throw new Error(`Error removing item from cart: ${error.message}`);
        }
    }

    static async clearCart(userId) {
        try {
            if (!mongoose.Types.ObjectId.isValid(userId)) {
                throw new Error("Invalid user ID format");
            }

            const cart = await this.getCart(userId);
            cart.items = [];
            await cart.save();

            return cart;
        } catch (error) {
            throw new Error(`Error clearing cart: ${error.message}`);
        }
    }

    static async convetToOrderData(userId) {
        try {
            const cart = await this.getCart(userId);

            if (cart.items.length === 0) {
                throw new Error("Cannot create order from empty cart");
            }

            const items = [];
            let subTotal = 0;

            for (let item of cart.items) {
                const product = await Product.findById(item._id);
                items.push({
                    productId: item._id,
                    quantity: item.quantity,
                    price: product.price
                });
                subTotal += product.price * item.quantity;
            }

            const insuranceFee = subTotal * 0.024;
            const deliveryFee = 100;
            const totalAmount = subTotal + insuranceFee + deliveryFee;

            return {
                userId,
                items,
                subTotal,
                insuranceFee,
                deliveryFee,
                totalAmount
            };

        } catch (error) {
            throw new Error(`Error converting cart to order data: ${error.message}`);
        }
    }

}

module.exports = CartService;