import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import bcrypt from 'bcrypt'

// Open a database connection
const db = await open({
  filename: process.env.DATABASE_FILE || './database.sqlite',
  driver: sqlite3.Database,
});
// Create the user table if it doesn't exist
await db.exec(`
  CREATE TABLE IF NOT EXISTS login (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(255),
    password VARCHAR(255),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`);

await db.exec(`
  CREATE TABLE IF NOT EXISTS post (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title VARCHAR(255),
    message VARCHAR(255),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`);

// Insert a default user if the table is empty
const userCount = await db.get('SELECT COUNT(*) AS count FROM login');
if (userCount.count === 0) {
  await db.run('INSERT INTO login (name) VALUES (?)', 'Anonymous');
}

/*

let myPlaintextPassword = 'Mypocketlogin'
bcrypt.hash(myPlaintextPassword, 10, async function(err, hash) {
	// här får vi nu tag i lösenordets hash i variabeln hash
	console.log(hash)

  await db.run('INSERT INTO login (name, password) VALUES (?, ?)', 'Admin', hash);
})

*/

// Export the database connection
export default db;