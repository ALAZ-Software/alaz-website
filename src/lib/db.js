import mysql from 'mysql2/promise';

let pool = null;

export function getDbPool() {
  if (pool) return pool;

  const host = process.env.DB_HOST;
  const user = process.env.DB_USER;
  const password = process.env.DB_PASSWORD;
  const database = process.env.DB_NAME;
  const port = Number(process.env.DB_PORT) || 3306;
  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl && (!host || !user || !database)) {
    return null;
  }

  try {
    if (databaseUrl) {
      pool = mysql.createPool(databaseUrl);
    } else {
      pool = mysql.createPool({
        host,
        port,
        user,
        password,
        database,
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0,
        ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : undefined,
      });
    }
    return pool;
  } catch (error) {
    console.error('[DB] Failed to initialize MySQL pool:', error);
    return null;
  }
}

let tableChecked = false;

async function ensureTableExists(db) {
  if (tableChecked) return;

  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS project_inquiries (
      id INT AUTO_INCREMENT PRIMARY KEY,
      project_type VARCHAR(100) NOT NULL,
      project_name VARCHAR(255) NOT NULL,
      brief TEXT NOT NULL,
      timeline VARCHAR(100) DEFAULT NULL,
      budget VARCHAR(100) DEFAULT NULL,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      company VARCHAR(255) DEFAULT NULL,
      ip_address VARCHAR(45) DEFAULT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
  `;

  await db.query(createTableQuery);
  tableChecked = true;
}

export async function saveInquiry(data) {
  const db = getDbPool();
  if (!db) {
    console.warn('[DB] MySQL credentials are not configured yet in environment variables.');
    return { saved: false, reason: 'Database not configured' };
  }

  try {
    await ensureTableExists(db);

    const query = `
      INSERT INTO project_inquiries (
        project_type,
        project_name,
        brief,
        timeline,
        budget,
        name,
        email,
        company,
        ip_address
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
      data.project_type || '',
      data.project_name || '',
      data.brief || '',
      data.timeline || null,
      data.budget || null,
      data.name || '',
      data.email || '',
      data.company || null,
      data.ip_address || null,
    ];

    const [result] = await db.execute(query, values);
    return { saved: true, insertId: result.insertId };
  } catch (error) {
    console.error('[DB] Error saving inquiry to MySQL:', error);
    return { saved: false, error: error.message };
  }
}
