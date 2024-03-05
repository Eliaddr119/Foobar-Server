import userServices from '../services/users.js';
import jwt from 'jsonwebtoken';

const getUser = async (req, res) => {
    try{
        const user = await userServices.getUser(req.params.id);
        res.status(200).json(user);
    }catch(error){
        res.status(404).json({ message: error.message });
    }
}

const createNewUser = async (req, res) => {
    try{
        const { username, password, displayName, profilePic, friends, friendsRequest } = req.body;
        const existingUser = await userServices.getUser(username);
        if (existingUser) {
            throw new Error("Username already exists")
        }
        const user = await userServices.createUser(username, password, displayName, profilePic, friends, friendsRequest);
        res.status(201).json(user);
    }catch(error){
        res.status(409).json({ message: error.message });
    }
}

const updateExistingUser = async (req, res) => {
    try{
        const { username, password, profilePic, friends, friendsRequest } = req.body;
        const user = await userServices.updateUser(username, password, profilePic, friends, friendsRequest);
        if (!user) { 
           throw new Error("No user found with this id");
        }
        res.status(200).json(user);
    }catch(error){
        res.status(409).json({ message: error.message });
    }
}

const removeUser = async (req, res) => {
    try{
        const user = await userServices.deleteUser(req.params.id);
        if (!user) {
            throw new Error("No user found with this id");
        }
        res.status(200).json({ message: "User deleted successfully" });
    }catch(error){
        res.status(404).json({ message: error.message });
    }
}

const addFriendRequest = async (req, res) => {
    try {
        if (req.params.id === req.params.fid) {
            throw new Error("You can't send friend request to yourself");
        }
        if (!await userServices.getUser(req.params.fid)) {
            throw new Error("No user found with this id");
        }
        await userServices.addFriendRequest(req.params.fid, req.params.id);
        res.status(200).json({ message: "Friend request sent successfully" });
        }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const removeFriendRequest = async (req, res) => {
    try {
        if (req.params.id === req.params.fid) {
            throw new Error("You can't remove friend request to yourself");
        }
        if (!await userServices.getUser(req.params.fid)) {
            throw new Error("No user found with this id");
        }
        await userServices.removeFriendRequest(req.params.fid, req.params.id);
        res.status(200).json({ message: "Friend request removed successfully" });
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
}

// const addFriend = async (req, res) => {
//     try {
//         if (req.params.id === req.params.fid) {
//             throw new Error("You can't add yourself as friend");
//         }
//         if (!await userServices.getUser(req.params.fid)) {
//             throw new Error("No user found with this id");
//         }
//         await userServices.addFriend(req.params.id, req.params.fid);
//         await userServices.removeFriendRequest(req.params.fid, req.params.id);
//         res.status(200).json({ message: "Friend added successfully" });
//     }
//     catch (error) {
//         res.status(404).json({ message: error.message });
//     }
// }

const removeFriend = async (req, res) => {
    try {
        if (req.params.id === req.params.fid) {
            throw new Error("You can't remove yourself as friend");
        }
        if (!await userServices.getUser(req.params.fid)) {
            throw new Error("No user found with this id");
        }
        await userServices.removeFriend(req.params.id, req.params.fid);
        res.status(200).json({ message: "Friend removed successfully" });
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const getFriendList = async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, 'foo');
        const username = decodedToken.username;

        const user = await userServices.getUser(req.params.id);
        if (user.username === username || user.friends.includes(req.query.id)) {
            res.status(200).json(user.friends);
        } else {
            throw new Error("You are not friends with this user");
        }
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const friendRequestAccept = async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, 'foo');
        const username = decodedToken.username;
        if (username === req.params.id) {
            const user = await userServices.getUser(req.params.id);
            if (!user.friendsRequest.includes(req.params.fid)) {
                throw new Error("No friend request found");
            }
            userServices.addFriend(req.params.id, req.params.fid);
            userServices.removeFriendRequest(req.params.id, req.params.fid);
            res.status(200).json({ message: "Friend request accepted successfully" });
        } else {
            throw new Error("you can't accept friend request for other user");
        }
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const friendRequestReject = async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, 'foo');
        const username = decodedToken.username;
        if (username === req.params.id) {
            const user = await userServices.getUser(req.params.id);
            if (!user.friendsRequest.includes(req.params.fid)) {
                throw new Error("No friend request found");
            }
            userServices.removeFriendRequest(req.params.id, req.params.fid);
            res.status(200).json({ message: "Friend request rejected successfully" });
        } else {
            throw new Error("you can't reject friend request for other user");
        }
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export {
    getUser,
    createNewUser,
    updateExistingUser,
    removeUser,
    addFriendRequest,
    removeFriendRequest,
    removeFriend,
    getFriendList,
    friendRequestAccept,
    friendRequestReject
}



// const getUser = async (req, res) => {
//     try {
//         const user = await userServices.getUser(req.params.id);
//         res.status(200).json(user);
//     } catch (error) {
//         res.status(404).json({ message: error.message });
//     }
// }

// const createNewUser = async (req, res) => {
//     try {
//         const { username, password, profilePic, friends } = req.body;
//         const user = await userServices.createUser(username, password, profilePic, friends);
//         res.status(201).json(user);
//     } catch (error) {
//         res.status(409).json({ message: error.message });
//     }
// }

// const updateExistingUser = async (req, res) => {
//     try {
//         const { username, password, profilePic, friends } = req.body;
//         const user = await userServices.updateUser(username, password, profilePic, friends);
//         res.status(200).json(user);
//     } catch (error) {
//         res.status(409).json({ message: error.message });
//     }
// }

// const removeUser = async (req, res) => {
//     try {
//         await userServices.deleteUser(req.params.id);
//         res.status(200).json({ message: "User deleted successfully" });
//     } catch (error) {
//         res.status(404).json({ message: error.message });
//     }
// }

// const addFriend = async (req, res) => {
//     try {
//         const user = await userServices.addFriend(req.params.id, req.body.friend);
//         res.status(200).json(user);
//     } catch (error) {
//         res.status(409).json({ message: error.message });
//     }
// }

// const removeFriend = async (req, res) => {
//     try {
//         const user = await userServices.removeFriend(req.params.id, req.body.friend);
//         res.status(200).json(user);
//     } catch (error) {
//         res.status(409).json({ message: error.message });
//     }
// }

// const getFriendPost = async (req, res) => {
//     try {
//         const token = req.headers.authorization.split(' ')[1];
//         const decodedToken = jwt.verify(token, 'foo');
//         const username = decodedToken.username;

//         const friend = await userServices.getUser(req.params.id);
//         if (!friend.friends.includes(username)) {
//             throw new Error("You are not friends with this user");
//         }
//         const friendPosts = await PostServices.getPostsByUserName(friend.username);
//         res.status(200).json(friendPosts);
//     } catch (error) {
//         res.status(404).json({ message: error.message });
//     }
// }

// const getFriendList = async (req, res) => {
//     try {
//         const token = req.headers.authorization.split(' ')[1];
//         const decodedToken = jwt.verify(token, 'foo');
//         const username = decodedToken.username;

//         const user = await userServices.getUser(req.params.id);
//         if (user.username === username || user.friends.includes(req.query.id)) {
//         res.status(200).json(user.friends);
//         }else {
//             throw new Error("You are not friends with this user");
//         }
//     } catch (error) {
//         res.status(404).json({ message: error.message });
//     }
// }

// const friendRequestAccept = async (req, res) => {
//     try {
//         const token = req.headers.authorization.split(' ')[1];
//         const decodedToken = jwt.verify(token, 'foo');
//         const username = decodedToken.username;
//         if (username === req.params.id) {
//             const user = await userServices.getUser(req.params.id);
//             if (!user.friendsRequest.includes(req.params.fid)) {
//                 throw new Error("No friend request found");
//             }
//             userServices.addFriend(req.params.id, req.params.fid);
//         }else {
//             throw new Error("you can't accept friend request for other user");
//         }
//     } catch (error) {
//         res.status(404).json({ message: error.message });
//     }
// }

// const friendRequestReject = async (req, res) => {
//     try {
//         const token = req.headers.authorization.split(' ')[1];
//         const decodedToken = jwt.verify(token, 'foo');
//         const username = decodedToken.username;
//         if (username === req.params.id) {
//             const user = await userServices.getUser(req.params.id);
//             if (!user.friendsRequest.includes(req.params.fid)) {
//                 throw new Error("No friend request found");
//             }
//             userServices.removeFriend(req.params.id, req.params.fid);
//         }
//         else {
//             throw new Error("you can't reject friend request for other user");
//         }
//     }
//     catch (error) {
//         res.status(404).json({ message: error.message });
//     }
// }

// export {
//     getUser,
//     createNewUser,
//     updateExistingUser,
//     removeUser,
//     addFriend,
//     removeFriend,
//     getFriendPost,
//     getFriendList,
//     friendRequestAccept,
//     friendRequestReject
// }

