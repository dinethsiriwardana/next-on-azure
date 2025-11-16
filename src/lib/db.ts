import mysql from 'mysql2/promise';

const config = {
  host: process.env.DB_SERVER || 'localhost',
  database: process.env.DB_DATABASE || 'ThreadsDB',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  port: parseInt(process.env.DB_PORT || '3306'),
  ssl: process.env.DB_ENCRYPT === 'true' ? { rejectUnauthorized: false } : undefined,
};

let pool: mysql.Pool | null = null;

export async function getPool(): Promise<mysql.Pool> {
  if (!pool) {
    pool = mysql.createPool(config);
  }
  return pool;
}

export async function closePool(): Promise<void> {
  if (pool) {
    await pool.end();
    pool = null;
  }
}

export { mysql };
