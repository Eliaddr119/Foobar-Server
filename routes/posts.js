import express from "express";
import {getAllPosts,getPost,createNewPost,updateExistingPost,removePost} from "../controllers/posts.js";

const router = express.Router();

router.get("/", getAllPosts);

router.get("/:id", getPost);

router.post("/", createNewPost);

router.patch("/:id", updateExistingPost);

router.delete("/:id", removePost);

export default router;