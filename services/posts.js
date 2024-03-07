import Post from '../models/posts.js';
import User from '../models/users.js';

const createPost = async (id, username, displayName, date, content, numlikes, likeby, image) => {
    const post = new Post({ id, username, displayName, content});
    if (date) {
        post.date = date;
    }
    if (numlikes) {
        post.numlikes = numlikes;
    }
    if (likeby) {
        post.likeby = likeby;
    }
    if (image) {
        post.image = image;
    }
    return await post.save();
}

const getPosts = async (username) => {
    const user = await User.findOne({ username: username });
    const friends = user.friends;
    
    const friendPosts = await Post.find({ username: { $in: friends } }).sort({ date: -1 }).limit(20);
    const nonFriendPosts = await Post.find({ username: { $nin: friends } }).sort({ date: -1 }).limit(5);
    
    if (friendPosts.length === 0) {
        return nonFriendPosts;
    }
    return [...friendPosts, ...nonFriendPosts];
}

const getPost = async (id) => {
    return await Post.findOne({ id: id });
}

const getPostsByUserName = async (username) => {
    return await Post.find({ username : username }).sort({ date: -1});
}

const updatePost = async (id, username, displayName, date, content, numlikes, likeby, image) => {
    const post = await Post.findOne({ id: id });
    if (username) {
        post.username = username;
    }
    if (displayName) {
        post.displayName = displayName;
    }
    if (date) {
        post.date = date;
    }
    if (content) {
        post.content = content;
    }
    if (numlikes) {
        post.numlikes = numlikes;
    }
    if (likeby) {
        post.likeby = likeby;
    }
    if (image) {
        post.image = image;
    }
    return await post.save();
}

const deletePost = async (id) => {
    await Post
        .findOneAndDelete({ id: id });
}

export default {    
    createPost,
    getPosts,
    getPost,
    updatePost,
    deletePost
}


// const posts = [
//     { id: 1, title: 'Post 1', content: 'Content of post 1' },
//     { id: 2, title: 'Post 2', content: 'Content of post 2' },
//     { id: 3, title: 'Post 3', content: 'Content of post 3' }
// ];

// function getPosts() {
//     return posts;
// }

// function getPost(id) {
//     return posts.find(posts => posts.id === id);
// }

// function createPost(title, content) {
//     const post = { id: posts.length + 1, title, content };
//     posts.push(post);
// }

// function updatePost(id, title, content) {
//     const post = posts.find(post => post.id === id);
//     if (post) {
//         post.title = title;
//         post.content = content;
//     }
// }

// function deletePost(id) {
//     const index = posts.findIndex(post => post.id === id);
//     if (index !== -1) {
//         posts.splice(index, 1);
//     }
// }

// export default {
//     getPosts,
//     getPost,
//     createPost,
//     updatePost,
//     deletePost
// }