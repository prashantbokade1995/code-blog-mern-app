const express = require("express");
const router = express.Router();
const Blog = require("../schema/blogSchema");
const { validateBlogData } = require("../validation/blogValidations");
const ObjectId = require("mongoose").Types.ObjectId;

// CRUD api's
// Create blog post
router.post("/", async (req, res) => {
    try {
        const blogData = req.body;

        const errorMessage = validateBlogData(blogData);

        if (errorMessage) {
            throw new Error(errorMessage);
        }

        const savedBlogData = await new Blog(blogData).save();

        res.status(200).json(savedBlogData);
    } catch (error) {
        res.status(500).json(error.message);
    }
});

// Get all blogs
router.get("/", async (req, res) => {
    try {
        const allBlogs = await Blog.find({}, { markdown: 0 });

        res.status(200).json(allBlogs);
    } catch (error) {
        res.status(500).json(error.message);
    }
});

// Get a single blog
router.get("/:id", async (req, res) => {
    try {
        const blogId = req.params.id;

        if (!ObjectId.isValid(blogId)) {
            throw new Error("Blog id is incorrect");
        }

        const blog = await Blog.findOne({ _id: blogId });

        if (!blog) {
            throw new Error("Blog with given id not found");
        }

        res.status(200).json(blog);
    } catch (error) {
        res.status(500).json(error.message);
    }
});

// Delete a single blog
router.delete("/:id", async (req, res) => {
    try {
        const blogId = req.params.id;

        if (!ObjectId.isValid(blogId)) {
            throw new Error("Blog id is incorrect");
        }

        const deletedBlog = await Blog.findOneAndDelete({ _id: blogId });

        if (!deletedBlog) {
            throw new Error("Blog with given id not found");
        }

        res.status(200).json(deletedBlog);
    } catch (error) {
        res.status(500).json(error.message);
    }
});

// Edit a single blog post
router.put("/:id", async (req, res) => {
    try {
        const blogId = req.params.id;
        const blogData = req.body;

        if (!ObjectId.isValid(blogId)) {
            throw new Error("Blog id is incorrect");
        }

        const errorMessage = validateBlogData(blogData);

        if (errorMessage) {
            throw new Error(errorMessage);
        }

        const editedBlogData = await Blog.findOneAndUpdate(
            { _id: blogId },
            blogData,
            { new: true }
        );

        if (!editedBlogData) {
            throw new Error("Blog with given id not found");
        }

        res.status(200).json(editedBlogData);
    } catch (error) {
        res.status(500).json(error.message);
    }
});

module.exports = router;
