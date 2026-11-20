const crypto = require('crypto');
const { loadDB, saveDB } = require('./db');

function hashPassword(password, salt) {
    if (!salt) {
        salt = crypto.randomBytes(16).toString('hex');
    }
    const hash = crypto.pbkdf2Sync(password, salt, 1000, 32, 'sha256').toString('hex');
    return { hash, salt };
}

function generateToken(userId) {
    const token = 'haven_token_' + crypto.randomBytes(24).toString('hex');
    const db = loadDB();
    db.tokens[token] = userId;
    saveDB(db);
    return token;
}

function getAuthUser(req) {
    const authHeader = req.headers['authorization'] || req.headers['Authorization'];
    if (!authHeader) return null;

    const parts = authHeader.split(' ');
    const token = parts.length === 2 ? parts[1] : parts[0];

    const db = loadDB();
    const userId = db.tokens[token];
    if (!userId) return null;

    const user = db.users.find(u => u.id === userId);
    if (!user) return null;

    // Return sanitized user profile (omit passwordHash & salt)
    const { passwordHash, salt, ...sanitizedUser } = user;
    return sanitizedUser;
}

module.exports = {
    hashPassword,
    generateToken,
    getAuthUser
};
