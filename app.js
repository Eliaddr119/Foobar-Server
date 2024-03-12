import express from "express";
var server = express();

import bodyParser from "body-parser";
server.use(bodyParser.json({ limit: '5mb' }));
server.use(bodyParser.urlencoded({ limit: '5mb', extended: true }));
import cors from "cors";
server.use(cors());

// import customEnv from 'custom-env';
// customEnv.env(process.env.NODE_ENV, './config');
// console.log(process.env.NODE_ENV);
// console.log(process.env.PORT);

import mongoose from "mongoose";
mongoose.connect("mongodb://127.0.0.1:27017", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
import postsData from "./Posts.json" assert { type: 'json' };
import usersData from "./Users.json" assert { type: 'json' };
import Post from "./models/posts.js";
import User from "./models/users.js";

try {
    await User.insertMany(usersData);
    await Post.insertMany(postsData);
} catch (error) {
    console.log(error);
}

server.use(express.static('public'));

server.use(express.json());

import postsRouter from "./routes/posts.js";
import usersRouter from "./routes/users.js";
import tokenRouter from "./routes/token.js";

server.use("/api/posts", postsRouter);
server.use("/api/users", usersRouter);
server.use("/api/tokens", tokenRouter);
// server.use("/" , )
// server.get("/", (req, res) => {
//     res.send("Hello World");
// });

server.listen(8080, () => {
    console.log("Server is running on port 8080 ");
});
