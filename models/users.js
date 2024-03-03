const users = [
    { username: 'user1', password: 'password1', friends: ['user2', 'user3'] , profilePic : 'jkdasdac'},
    { username: 'user2', password: 'password2', friends: ['user1', 'user3'], profilePic : 'odasqwedac'},
    { username: 'user3', password: 'password3', friends: ['user1', 'user2'],profilePic : 'cdassdasdac'},
    { username: 'user4', password: 'password4', friends: ['user1', 'user2', 'user3'],profilePic : 'adavxcssdac'},
    { username: 'user5', password: 'password5', friends: ['user1', 'user2', 'user3'],profilePic : 'qdahtssdac'}
    ];

function getUser(username) {
    return users.find(user => user.username === username);
}

function createUser(username, password , profilePic) {
    const user = { username, password, friends: [] , profilePic : profilePic};
    users.push(user);
}

function updateUser(username, password, profilePic) {
    const user = users.find(user => user.username === username);
    if (user) {
        user.password = password;
        user.profilePic = profilePic;
    }
}

function deleteUser(username) {
    const index = users.findIndex(user => user.username === username);
    if (index !== -1) {
        users.splice(index, 1);
    }
}

function addFriend(username, friend) {
    const user = users.find(user => user.username === username);
    if (user) {
        user.friends.push(friend);
    }
}

function removeFriend(username, friend) {
    const user = users.find(user => user.username === username);
    if (user) {
        const index = user.friends.findIndex(f => f === friend);
        if (index !== -1) {
            user.friends.splice(index, 1);
        }
    }
}

export default {
    getUser,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    removeFriend
}
