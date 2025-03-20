// eslint-disable-next-line no-undef
const Product = require("../models/Product");
const mongoose = require("mongoose");

class ProductService {
    static async getAllProducts(type, _limit) {
        try {
            let query = {};

            if (type) query.type = type;
            let productQuery = Product.find(query);

            if (_limit) productQuery = productQuery.limit(parseInt(_limit));

            return await productQuery;
        } catch (error) {
            throw new Error(`Error fetching products: ${error.message}`);
        }
    }

    static async findProductByID(id) {
        try {
            if (!mongoose.Types.ObjectId.isValid(id)) {
                throw new Error("Invalid product ID format.");
            }

            return await Product.findById(id);
        } catch (error) {
            throw new Error(`Error fetching product: ${error.message}`);
        }
    }

    static async findProductByType(type) {
        try {
            return await Product.find({ type: type });
        } catch (error) {
            throw new Error(`Error fetching product by type: ${error.message}`);
        }
    }

    static async addProduct(productData) {
        try {
            const newProduct = new Product(productData);
            const savedProduct = await newProduct.save();
            return savedProduct;
        } catch (error) {
            throw new Error(`Error adding product: ${error.message}`);
        }
    }
}

// eslint-disable-next-line no-undef
module.exports = ProductService;