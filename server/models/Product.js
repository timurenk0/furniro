/* eslint-disable no-undef */
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: { type: String, required: true, index: true },
    type: { type: String, required: true },
    description: { type: String, default: "Product description" },
    price: { type: Number, required: true },
    imageURLs: { type: Map, of: String }
})

const Product = mongoose.model("Product", productSchema);

module.exports = Product;