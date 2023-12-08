import express from "express";
import postModel from "../models/post-models.js";

const router = express.Router();
// const fixture = "/";

router.get("/get-posts", async (req, res, next) => {
    try {
        const result = await postModel.find();
        res.status(200).json({
            message: "Posts fetched successfully :)",
            retrievedPosts: result
        });
    } catch (error) {
        console.log("Error while fetching posts :(", error);
    }
});

router.post("/add-post", async (req, res, next) => {
    try {
        const currentPost = new postModel({
            title: req.body.title,
            content: req.body.content
        });
        
        const result = await currentPost.save();
        
        res.status(200).json({
            message: "Post added successfully :)"
        });
    } catch (error) {
        console.log("Error while creating post :(", error);
    }
});

router.delete("/delete-post/:id", async (req, res, next) => {
    try {
        const id = req.params.id;
        const result = await postModel.deleteOne({_id: id});
        res.status(200).json({
            message: "Post deleted successfully :)"
        });

    } catch (error) {
        console.log("Error while deleting post :(", error);
    }
});


export { router as postRouter }
