const { loadDB, saveDB } = require('../db');
const { hashPassword, generateToken, getAuthUser } = require('../auth');

function handleAuthRoutes(req, res, pathName, body) {
    if (req.method === 'POST' && pathName === '/api/auth/register') {
        const { email, password, name } = body || {};
        if (!email || !password || !name) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify({ error: 'Name, email, and password are required' }));
        }

        const db = loadDB();
        const existing = db.users.find(u => u.email.toLowerCase() === email.toLowerCase());
        if (existing) {
            res.writeHead(409, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify({ error: 'An account with this email already exists' }));
        }

        const { hash, salt } = hashPassword(password);
        const userId = 'usr_' + Date.now();
        const newUser = {
            id: userId,
            email: email.toLowerCase(),
            passwordHash: hash,
            salt,
            name,
            membership: 'Haven Member',
            tier: 'Rose Gold Tier',
            havenCoins: 500
        };

        db.users.push(newUser);
        saveDB(db);

        const token = generateToken(userId);
        const { passwordHash: _, salt: __, ...sanitizedUser } = newUser;

        res.writeHead(201, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({
            message: 'User registered successfully',
            token,
            user: sanitizedUser
        }));
    }

    if (req.method === 'POST' && pathName === '/api/auth/login') {
        const { email, password } = body || {};
        if (!email || !password) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify({ error: 'Email and password are required' }));
        }

        const db = loadDB();
        const user = db.users.find(u => u.email.toLowerCase() === email.toLowerCase());
        if (!user) {
            res.writeHead(401, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify({ error: 'Invalid email or password' }));
        }

        const { hash } = hashPassword(password, user.salt);
        if (hash !== user.passwordHash) {
            res.writeHead(401, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify({ error: 'Invalid email or password' }));
        }

        const token = generateToken(user.id);
        const { passwordHash: _, salt: __, ...sanitizedUser } = user;

        res.writeHead(200, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({
            message: 'Login successful',
            token,
            user: sanitizedUser
        }));
    }

    if (req.method === 'GET' && pathName === '/api/auth/me') {
        const user = getAuthUser(req);
        if (!user) {
            res.writeHead(401, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify({ error: 'Unauthorized. Please provide a valid Bearer token.' }));
        }

        res.writeHead(200, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ user }));
    }

    return false; // Route not matched
}

module.exports = { handleAuthRoutes };
