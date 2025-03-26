/* eslint-disable no-undef */
const dotenv = require("dotenv").config();
const stripe = require('stripe')(process.env.STRIPE_SK);
const CartService = require('./cartService');

class PaymentService {
    static async createCheckoutSession(userId) {
        try {
            const cart = await CartService.getCart(userId);

            let totalPrice = cart.items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

            const lineItems = cart.items.map(item => ({
                price_data: {
                    unit_amount: Math.round(item.product.price * 1.024 * 100),
                    currency: 'usd',
                    product_data: {
                        name: `${item.product.name} + insurance fee`,
                    },
                },
                quantity: item.quantity,
            }));

            if (totalPrice < 350) {
                console.log("Total is below $350, adding extra $100 fee.");
                totalPrice += 100;

                lineItems.push({
                    price_data: {
                        currency: "usd",
                        product_data: { name: "Service Fee" },
                        unit_amount: 10000, // $100 in cents
                    },
                    quantity: 1,
                });
            }

            const adjustedTotal = Math.round(totalPrice * 1.024 * 100);
            console.log(`Final total after 2.4% increase: $${adjustedTotal / 100}`);

            // Create Stripe Checkout Session
            const session = await stripe.checkout.sessions.create({
                payment_method_types: ["card"],
                line_items: lineItems,
                mode: "payment",
                success_url: `http://localhost:5173/success`,
                cancel_url: `http://localhost:5173/cart`,
                metadata: { adjustedTotal: adjustedTotal / 100 }, // Store for reference
            });


            return session;
        } catch (error) {
            throw new Error(`Error creating checkout session: ${error.message}`);
        }
    }
}

module.exports = PaymentService;