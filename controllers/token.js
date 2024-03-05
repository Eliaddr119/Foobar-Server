import { generateToken } from '../models/token.js';
import userServices from '../services/users.js';

const getToken = async (req, res) => {
        const {username, password } = req.body;
        const user = await userServices.getUser(username);
        // Check if the user exists
        if (!user) {
            res.status(401).send('User not found');
            return;
        }
        // Check if the password is correct
        if (user.password !== password) {
            res.status(401).send('Invalid password');
            return;
        }
        // Generate the token
        const token = generateToken(username);
        res.json({ token });
}

export {
    getToken
}