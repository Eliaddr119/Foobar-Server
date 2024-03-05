import { error } from 'console';
import { generateToken } from '../models/tokens.js';
import userServices from '../services/users.js';

const getToken = async (req, res) => {
    try {
        const {username, password } = req.body;
        const user = await userServices.getUser(username);
        // Check if the user exists
        if (!user) {
            throw new Error("User not found");
        }
        // Check if the password is correct
        if (user.password !== password) {
            throw new Error("Invalid password");
        }
        // Generate the token
        const token = generateToken(username);
        res.status(200).json({ token });
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export {
    getToken
}