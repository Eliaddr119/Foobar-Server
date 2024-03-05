import express from "express";
import {     getUser,
    createNewUser,
    updateExistingUser,
    removeUser,
    addFriendRequest,
    removeFriendRequest,
    removeFriend,
    getFriendList,
    friendRequestAccept,
    friendRequestReject } from "../controllers/users.js";

const router = express.Router();

router.post("/", createNewUser);

router.get("/:id", getUser);

router.patch("/:id", updateExistingUser);

router.delete("/:id", removeUser);

// router.get("/:id/posts", getFriendPost);

router.get("/:id/friends", getFriendList);

router.post("/:id/friends", addFriendRequest);

router.patch("/:id/friends/:fid", friendRequestAccept);

router.delete("/:id/friends", friendRequestReject);

export default router;