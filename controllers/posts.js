import postModel from '../models/posts.js';

function getAllPosts(req, res) {
    const posts = postModel.getPosts();
    res.json(posts);}

function getPost(req, res) {
    const post = postModel.getPost(req.params.id);
    res.json(post);
}

function createNewPost(req, res) {
    const { title, content } = req.body;
    postModel.createPost(title, content);
    res.status(201).send('Post created');
}

function updateExistingPost(req, res) {
    const { title, content } = req.body;
    postModel.updatePost(req.params.id, title, content);
    res.status(200).send('Post updated');
}

function removePost(req, res) {
    postModel.deletePost(req.params.id);
    res.status(204).send('Post deleted');
}

export {
    getAllPosts,
    getPost,
    createNewPost,
    updateExistingPost,
    removePost
}