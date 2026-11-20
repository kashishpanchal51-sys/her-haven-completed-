const { loadDB, saveDB } = require('./src/db');
const { hashPassword } = require('./src/auth');

const db = loadDB();
const { hash, salt } = hashPassword('password123');

const user = db.users.find(u => u.email === 'priya.sharma@sanctuary.haven');
if (user) {
    user.passwordHash = hash;
    user.salt = salt;
    saveDB(db);
    console.log('Updated user Priya Sharma password to password123');
}
