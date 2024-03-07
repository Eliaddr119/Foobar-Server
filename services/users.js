import User from '../models/users.js';
import Post from '../models/posts.js';
import e from 'cors';

const getUser = async (username) => {
    const user = await User.findOne({ username: username });
    return [user.username, user.displayName, user.profilePic]
}

const getUserByDisplayName = async (displayName) => {
    return await User.findMany({ displayName: displayName });
}

const createUser = async (username, password, displayName, profilePic, friends, friendsRequest) => {
    if (await User.findOne({ username: username })) {
        throw new Error("Username already exists");
    }
    const user = new User({ username, password, displayName, profilePic });
    if (friends) {
        user.friends = friends;
    }
    if (friendsRequest) {
        user.friendsRequest = friendsRequest;
    }
    return await user.save();
}

const updateUser = async (username, password, displayName, profilePic, friends, friendsRequest) => {
    const user = await User.findOne({ username: username });
    if (!user) {
        throw new Error("User not found");
    }
    if (password) {
        user.password = password;
    }
    if (profilePic) {
        user.profilePic = profilePic;
    }
    if (displayName) {
        user.displayName = displayName;
    }
    if (friends) {
        user.friends = friends;
    }
    if (friendsRequest) {
        user.friendsRequest = friendsRequest;
    }
    const userPosts = await Post.find({ username: username });
    userPosts.forEach(async (post) => {
        post.displayName = displayName;
        post.profilePic = profilePic;
        await post.save();
    });
    return await user.save();
}

const deleteUser = async (username) => {
    if (!await User.findOne({ username: username })) {
        throw new Error("User not found");
    }
    Post.deleteMany({ username: username })
    const post = await Post.find({})
    post.forEach(async (post) => {
        const index = post.likeby.indexOf(username);
        if (index !== -1) {
            post.likeby.splice(index, 1);
            post.numlikes -= 1;
            await post.save();
        }
    });
    const users = await User.find({});
    users.forEach(async (user) => {
        const index = user.friends.indexOf(username);
        if (index !== -1) {
            user.friends.splice(index, 1);
            await user.save();
        }
        index = user.friendsRequest.indexOf(username);
        if (index !== -1) {
            user.friendsRequest.splice(index, 1);
            await user.save();
        }
    });
    return await User.findOneAndDelete({ username: username });
}

const removeFriend = async (username, friend) => {
    const user = await User.findOne({ username: username });
    const friendUser = await User.findOne({ username: friend })
    if (!user || !friendUser) {
        throw new Error("User or friend not found");
    }
    const index = user.friends.indexOf(friend);
    if (index !== -1) {
        user.friends.splice(index, 1);
    } else {
        throw new Error("FriendUser is not your friend")
    }
    index = friendUser.indexOf(username)
    if (index !== -1) {
        friendUser.friends.splice(index, 1)
    }
    await friend.save
    return await user.save();
}

const addFriendRequest = async (username, friend) => {
    const user = await User.findOne({ username: username });
    const friendUser = await User.findOne({ username: friend });
    if (!user || !friendUser) {
        throw new Error("user not found or friend not found")
    }
    if (username === friend) {
        throw new Error("You can't add yourself as a friend")
    }
    if (!friendUser.friendsRequest.includes(username)) {
        user.friendsRequest.push(username);
    }
    await friendUser.save();
    return await user.save();
}

const acceptFriendRequest = async (username, friend) => {
    const user = await User.findOne({ username: username });
    const friendUser = await User.findOne({ username: friend });
    if (!user || !friendUser) {
        throw new Error("user not found")
    }
    index = user.friendsRequest.indexOf(friend);
    if (index !== -1) {
        user.friendsRequest.splice(index, 1);
        user.friends.push(friend);
        friendUser.friends.push(username);
    } else {
        throw new Error("friend request not found")
    }
    await friendUser.save();
    return await user.save();
}

const rejectFriendRequest = async (username, friend) => {
    const user = await User.findOne({ username: username });
    if (!user) {
        throw new Error("user not found")
    }
    index = user.friendsRequest.indexOf(friend);
    if (index !== -1) {
        user.friendsRequest.splice(index, 1);
    } else {
        throw new Error("friend request not found")
    }
    return await user.save();
}

const updatePostUser = async (username, postid, content, image ) => {
    const post = await Post.findOne({ id: postid });
    if (!post) {
        throw new Error("Post not found");
    }
    if (post.username !== username) {
        throw new Error("You can only update your own post");
    }
    post.content = content;
    post.image = image;
    return await post.save();
}

const deletePostUser = async (username, postid) => {
    const post = await Post.findOne({ id: postid });
    if (!post) {
        throw new Error("Post not found");
    }
    if (post.username !== username) {
        throw new Error("You can only delete your own post");
    }
    return await Post.findOneAndDelete({ id: postid });
}

const getFriendList = async (friend, username) => {
    const user = await User.findOne({ username: friend });
    if (!user) {
        throw new Error("User not found");
    }
    if (user.friends.includes(username) || user.username === username) {
        return user.friends;
    } else {
        throw new Error("You are not friends with this user");
    }
}
const createPost = async (id,username, displayName, profilePic, date, content, numlikes, likeby, image) => {
    const post = new Post({username, displayName, profilePic, content });
    if (id) {
        post.id = id;
    }
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

const getUserPosts = async (friend, username) => {
    const friendUser = await User.findOne({ username: friend });
    const user = await User.findOne({ username: username });
    if (!friendUser) {
        throw new Error("User not found");
    }
    if (friendUser.friends.includes(username) || friendUser.username === username) {
        return await Post.find({ username: friend });
    }else {
        throw new Error("You are not friends with this user");
    }
}

const addlike = async (username, postid) => {
    const post = await Post.findOne({ id: postid });
    if (!post) {
        throw new Error("Post not found");
    }
    if (post.likeby.includes(username)) {
        throw new Error("You have already liked this post");
    }
    post.numlikes += 1;
    post.likeby.push(username);
    return await post.save();
}

const removeLike = async (username, postid) => {
    const post = await Post.findOne({ id: postid });
    if (!post) {
        throw new Error("Post not found");
    }
    const index = post.likeby.indexOf(username);
    if (index === -1) {
        throw new Error("You have not liked this post");
    }
    post.numlikes -= 1;
    post.likeby.splice(index, 1);
    return await post.save();
}

const getLikeList = async (postid) => {
    const post = await Post.findOne({ id: postid });
    if (!post) {
        throw new Error("Post not found");
    }
    return post.likeby;
}

export default {
    getUser,
    getUserByDisplayName,
    createUser,
    updateUser,
    deleteUser,
    removeFriend,
    addFriendRequest,
    acceptFriendRequest,
    rejectFriendRequest,
    updatePostUser,
    deletePostUser,
    getFriendList,
    createPost,
    getUserPosts,
    addlike,
    removeLike,
    getLikeList
}