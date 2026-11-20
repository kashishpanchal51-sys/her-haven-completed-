const fs = require('fs');
const path = require('path');

const DB_FILE = path.join(__dirname, '..', 'data', 'db.json');

function loadDB() {
    try {
        if (!fs.existsSync(DB_FILE)) {
            throw new Error(`Database file missing at ${DB_FILE}`);
        }
        const raw = fs.readFileSync(DB_FILE, 'utf8');
        return JSON.parse(raw);
    } catch (err) {
        console.error('[DB ERROR] Failed to load db.json:', err.message);
        return { products: [], users: [], tokens: {}, carts: {}, coupons: {} };
    }
}

function saveDB(db) {
    try {
        fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2), 'utf8');
    } catch (err) {
        console.error('[DB ERROR] Failed to save db.json:', err.message);
    }
}

module.exports = {
    loadDB,
    saveDB
};
