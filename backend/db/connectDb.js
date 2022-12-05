const mongoose = require("mongoose");

// const MONGODB_URI = process.env.MONGODB_URI
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/mern-blog-backend";

const connectDb = async () => {
    try {
        await mongoose.connect(MONGODB_URI);
        // await mongoose.connect("mongodb://localhost:27017/mern-blog-backend");
        console.log("Db connected successfully");
    } catch (error) {
        console.log("Error connecting to mongodb", error);
    }
};

module.exports = { connectDb };

