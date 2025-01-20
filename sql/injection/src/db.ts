import Database from 'better-sqlite3'
export interface User {
  id: number
  displayName: string
  password: string
  email: string
}

export const db = new Database('db.sqlite')

const samplePassword = 'pass123'

export async function initDatabaseWithSample() {
  try {
    const users = db.prepare('SELECT * FROM users').all()

    if (users.length > 0) {
      return
    }
  } catch (error) {
    //
  }

  console.log('Database not found, creating...')

  db.prepare(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      displayName TEXT NOT NULL,
      password TEXT NOT NULL,
      email TEXT NOT NULL
    );
  `).run()

  db.prepare(`
    INSERT OR IGNORE INTO users (displayName, password, email) VALUES
    ('John Doe', '${samplePassword}', 'john@me.com'),
    ('Jane Doe', '${samplePassword}', 'jane@me.com'),
    ('Bob Doe', '${samplePassword}', 'bob@me.com');
  `).run()

  console.log('Database initialized.')
}
