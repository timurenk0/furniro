/* eslint-disable no-undef */
const express = require("express");
const ProductService = require("../service/productService");
const router = express.Router();

router.get("/products", async (req, res) => {
    try {
        const limit = parseInt(req.query._limit) || 0;
        const type = req.query.type;

        const products = await ProductService.getAllProducts(type, limit);

        res.json(products);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get("/products/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const product = await ProductService.findProductByID(id);
        res.json(product);
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

router.post("/products", async (req, res) => {
    try {
        const productData = req.body;
        const newProduct = await ProductService.addProduct(productData);

        return res.status(200).json({
            message: "Product added successfully",
            product: newProduct
        })
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

module.exports = router;