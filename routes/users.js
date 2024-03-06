import express from "express";
import {
    getUser,
    getUserByDisplayName,
    createNewUser,
    updateExistingUser,
    removeUser,
    addFriendRequest,
    rejectFriendRequest,
    addFriend,
    updatePostUser,
    deletePostUser,
    getUserFriends,
    createPost,
    getUserPosts
} from "../controllers/users.js";

const router = express.Router();

router.post("/", createNewUser); //create new user

router.get("/:id", getUser); //get user id

router.patch("/:id", updateExistingUser); //update user id

router.delete("/:id", removeUser); //delete user id

router.get("/displayName/:did", getUserByDisplayName); //get user by displayname

router.get("/:id/posts", getUserPosts); //get user posts

router.post("/:id/posts", createPost); //create post

router.patch("/:id/posts/:pid", updatePostUser); //update post pid

router.delete("/:id/posts/:pid", deletePostUser); //delete post pid

router.get("/:id/friends",getUserFriends); //get friend list

router.post("/:id/friends", addFriendRequest); //add friend request

router.patch("/:id/friends/:fid", addFriend); //accept friend request fid in user id

router.delete("/:id/friends/:fid", rejectFriendRequest); //reject friend request fid in user id

export default router;