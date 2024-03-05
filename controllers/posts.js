import postService from '../services/posts.js';
import jwt from 'jsonwebtoken';

const getPosts = async (req, res) => {
    try {
        const token = req.headers.authorization;
        const decodedToken = jwt.verify(token, 'foo');
        const username = decodedToken.username;
        const posts = await postService.getPosts(username);
        res.json(posts);
    }
    catch (error) {
        res.status(401).send('Invalid token');
    }
    // const token = req.headers.authorization.split(' ')[1];
    // const decodedToken = jwt.verify(token, 'foo');
    // const username = decodedToken.username;
    // const posts = await postService.getPosts(username);
    // res.json(posts);
}

const getPost = async (req, res) => {
    const post = postService.getPost(req.params.id);
    if (!post) {
        res.status(404).send('Post not found');
        return;
    }
    res.json(post);
}

const createNewPost = async (req, res) => {
    const { id, username, displayName, date, content, numlikes, likeby, image } = req.body;
    await postService.createPost(id, username, displayName, date, content, numlikes, likeby, image);
    res.status(201).send('Post created');
}

const updateExistingPost = async (req, res) => {
    const { id, username, displayName, date, content, numlikes, likeby, image } = req.body;
    await postService.updatePost(id, username, displayName, date, content, numlikes, likeby, image);
    res.status(200).send('Post updated');
}

const removePost = async (req, res) => {
    await postService.deletePost(req.params.id);
    res.status(204).send('Post deleted');
}

export {
    getPosts,
    getPost,
    createNewPost,
    updateExistingPost,
    removePost
}




// function getAllPosts(req, res) {
//     const posts = postModel.getPosts();
//     res.json(posts);}

// function getPost(req, res) {
//     const post = postModel.getPost(req.params.id);
//     res.json(post);
// }

// function createNewPost(req, res) {
//     const { title, content } = req.body;
//     postModel.createPost(title, content);
//     res.status(201).send('Post created');
// }

// function updateExistingPost(req, res) {
//     const { title, content } = req.body;
//     postModel.updatePost(req.params.id, title, content);
//     res.status(200).send('Post updated');
// }

// function removePost(req, res) {
//     postModel.deletePost(req.params.id);
//     res.status(204).send('Post deleted');
// }

// export {
//     getAllPosts,
//     getPost,
//     createNewPost,
//     updateExistingPost,
//     removePost
// }