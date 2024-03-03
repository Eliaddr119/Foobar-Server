import {generateToken}from '../models/token.js';

function getToken(req, res) {
    const { user, password } = req.body;
    const token = generateToken(user, password);
    res.json({ token });
}

export {
    getToken
}