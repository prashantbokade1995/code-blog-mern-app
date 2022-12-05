require ('dotenv').config()
const path = require("path");
const express = require("express");
const { connectDb } = require("./db/connectDb");
const blogRoutes = require("./routes/blogRoutes");
const app = express();
const cors = require("cors");
const PORT = 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
connectDb();

// console.log(process.env.MONGODB_URI)

app.use("/api/blog/", blogRoutes);


// Set static folder up in production
app.use(express.static(path.join(__dirname, "../frontend/build")));
app.get("*", (req, res) =>
res.sendFile(path.join(__dirname, "../frontend/build/index.html"))
);

// console.log(__dirname);

app.listen(PORT, () => {
    console.log("http://localhost:8000/api/blog/ is running on port:", PORT);
});
