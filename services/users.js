import User from '../models/users.js';

const getUser = async (username) => {
    return await User.findOne({ username: username });
}

const createUser = async (username, password, displayName, profilePic, friends, friendsRequest) => {
    const user = new User({ username, password , displayName});
    if (friends) {
        user.friends = friends;
    }
    if (friendsRequest) {
        user.friendsRequest = friendsRequest;
    }
    if (profilePic) {
        user.profilePic = profilePic;
    }
    return await user.save();
}

const updateUser = async (username, password, profilePic, friends, friendsRequest) => {
    const user = await User.findOne({ username: username });
    if (password) {
        user.password = password;
    }
    if (profilePic) {
        user.profilePic = profilePic;
    }
    if (friends) {
        user.friends = friends;
    }
    if (friendsRequest) {
        user.friendsRequest = friendsRequest;
    }
    return await user.save();
}

const deleteUser = async (username) => {
    return await User.findOneAndDelete({ username: username });
}

const addFriend = async (username, friend) => {
    const user = await User.findOne({ username: username });
    if (!user.friends.includes(friend)) {
        user.friends.push(friend);
    }
    return await user.save();
}

const removeFriend = async (username, friend) => {
    const user = await User.findOne({ username: username });
    const index = user.friends.indexOf(friend);
    if (index !== -1) {
        user.friends.splice(index, 1);
    }
    return await user.save();
}

const addFriendRequest = async (username, friend) => {
    const user = await User.findOne({ username: username });
    if (!user.friendsRequest.includes(friend)) {
        user.friendsRequest.push(friend);
    }
    return await user.save();
}

const removeFriendRequest = async (username, friend) => {
    const user = await User.findOne ({ username: username });
    const index = user.friendsRequest.indexOf(friend);
    if (index !== -1) {
        user.friendsRequest.splice(index, 1);
    }
    return await user.save();
}

export default {
    getUser,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    removeFriend,
    addFriendRequest,
    removeFriendRequest
}