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
    getUserPosts,
    addlike,
    removeLike,
    getLikeList
} from "../controllers/users.js";
import {authorization} from "../controllers/tokens.js";

const router = express.Router();

router.post("/", createNewUser); //create new user

router.get("/:id" ,getUser); //get user id

router.patch("/:id" ,updateExistingUser); //update user id

router.delete("/:id" ,removeUser); //delete user id

router.post("/:id/posts" ,createPost); //create post

router.get("/:id/posts" ,getUserPosts); //get user posts

router.get("/:id/friends" ,getUserFriends); //get friend list

router.post("/:id/friends" ,addFriendRequest); //add friend request

router.patch("/:id/friends/:fid" ,addFriend); //accept friend request fid in user id

router.delete("/:id/friends/:fid" ,rejectFriendRequest); //reject friend request fid in user id

router.patch("/:id/posts/:pid" ,updatePostUser); //update post pid

router.delete("/:id/posts/:pid" ,deletePostUser); //delete post pid

router.patch("/:id/posts/:pid/like" ,addlike); //add like to post pid

router.delete("/:id/posts/:pid/like" ,removeLike); //remove like from post pid

router.get("/:id/posts/:pid/like" ,getLikeList); //get post like list [string -> username1, username2, ...]

router.get("/displayName/:did" ,getUserByDisplayName); //get array of users with this display name(displayName = :did)

export default router;