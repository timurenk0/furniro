/* eslint-disable no-undef */
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");


const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());
app.use("/api", userRoutes);
app.use("/api", productRoutes);

cloudinary.config({
    cloud_name: process.env.cloud_name,
    api_key: process.env.CLOUD_API,
    api_secret: process.env.CLOUD_SECRET_API
});

const upload = multer({ dest: "uploads/" });

app.post("/upload", upload.single("image"), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: "No file uploaded" })
        }

        const result = await cloudinary.uploader.upload(req.file.path, {
            folder: "uploads",
        })

        console.log("Cloudinary response:", result);

        fs.unlinkSync(req.file.path);
        res.json({ imageUrl: result.secure_url });
    } catch (error) {
        res.status(500).json({ error: "Upload failed: " + error.message });
    }

})

mongoose.connect(process.env.MONGO_URI).then(() => console.log("MongoDB connected.")).catch((err) => console.error(err));

app.get("/", (req, res) => {
    res.send("API is running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));