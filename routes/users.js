import express from "express";
import { getUser, createNewUser, updateExistingUser, removeUser, addFriend, removeFriend } from "../controllers/users.js";

const router = express.Router();

router.get("/:id", getUser);

router.patch("/:id", updateExistingUser);

router.delete("/:id", removeUser);

export default router;