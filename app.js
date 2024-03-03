import express from "express";
import bodyParser from "body-parser";
import postsRouter from "./routes/posts.js";
import usersRouter from "./routes/users.js";
const server = express();
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(express.json());
server.use("/api/posts/", postsRouter);
server.use("/api/uses/", usersRouter);
server.get("/", (req, res) => {
    res.send("Hello World");
    });
server.listen(8080, () => {
    console.log("Server is running on port 8080");
    }
);