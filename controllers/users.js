import usersModel from '../models/users.js';

function getUser(req, res) {
    const user = usersModel.getUser(req.params.id);
    res.json({ username: user.username, friends: user.friends, profilePic: user.profilePic });
}

function createNewUser(req, res) {
    const { username, password, profilePic } = req.body;
    usersModel.createUser(username, password, profilePic);
    res.status(201).send('User created');
}

function updateExistingUser(req, res) {
    const { password, profilePic } = req.body;
    usersModel.updateUser(req.params.id, password, profilePic);
    res.status(200).send('User updated');
}

function removeUser(req, res) {
    usersModel.deleteUser(req.params.id);
    res.status(204).send('User deleted');
}

function addFriend(req, res) {
    usersModel.addFriend(req.params.id, req.params.friend);
    res.status(200).send('Friend added');
}

function removeFriend(req, res) {
    usersModel.removeFriend(req.params.id, req.params.friend);
    res.status(200).send('Friend removed');
}

export {
    getUser,
    createNewUser,
    updateExistingUser,
    removeUser,
    addFriend,
    removeFriend
}