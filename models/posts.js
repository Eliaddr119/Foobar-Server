const posts = [
    { id: 1, title: 'Post 1', content: 'Content of post 1' },
    { id: 2, title: 'Post 2', content: 'Content of post 2' },
    { id: 3, title: 'Post 3', content: 'Content of post 3' }
];

function getPosts() {
    return posts;
}

function getPost(id) {
    return posts.find(posts => posts.id === id);
}

function createPost(title, content) {
    const post = { id: posts.length + 1, title, content };
    posts.push(post);
}

function updatePost(id, title, content) {
    const post = posts.find(post => post.id === id);
    if (post) {
        post.title = title;
        post.content = content;
    }
}

function deletePost(id) {
    const index = posts.findIndex(post => post.id === id);
    if (index !== -1) {
        posts.splice(index, 1);
    }
}

export default {
    getPosts,
    getPost,
    createPost,
    updatePost,
    deletePost
}