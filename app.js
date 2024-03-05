import express from "express";
var server = express();

import bodyParser from "body-parser";
server.use(bodyParser.json({ limit: '1mb' }));
server.use(bodyParser.urlencoded({ limit: '1mb', extended: true }));
import cors from "cors";
server.use(cors());

// import customEnv from 'custom-env';
// customEnv.env(process.env.NODE_ENV, './config');
// console.log(process.env.NODE_ENV);
// console.log(process.env.PORT);

import mongoose from "mongoose";
mongoose.connect("mongodb://localhost:27017", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

server.use(express.static('public'));

server.use(express.json());

import postsRouter from "./routes/posts.js";
import usersRouter from "./routes/users.js";
import tokenRouter from "./routes/token.js";

server.use("/api/posts", postsRouter);
server.use("/api/users", usersRouter);
server.use("/api/token", tokenRouter);
// server.use("/" , )
// server.get("/", (req, res) => {
//     res.send("Hello World");
// });

server.listen(8080, () => {
    console.log("Server is running on port 8080 ");
});


// import express from "express";
// import bodyParser from "body-parser";
// import postsRouter from "./routes/posts.js";
// import usersRouter from "./routes/users.js";
// const server = express();
// server.use(bodyParser.json());
// server.use(bodyParser.urlencoded({ extended: true }));
// server.use(express.json());
// server.use("/api/posts/", postsRouter);
// server.use("/api/uses/", usersRouter);
// server.get("/", (req, res) => {
//     res.send("Hello World");
//     });
// server.listen(8080, () => {
//     console.log("Server is running on port 8080");
//     }
// );