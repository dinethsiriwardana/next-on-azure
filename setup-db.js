import mysql from 'mysql2/promise';

const config = {
  host: process.env.DB_SERVER || 'localhost',
  database: process.env.DB_DATABASE || 'ThreadsDB',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  port: parseInt(process.env.DB_PORT || '3306'),
  ssl: process.env.DB_ENCRYPT === 'true' ? { rejectUnauthorized: false } : undefined,
};

async function setupDatabase() {
  let connection;
  try {
    connection = await mysql.createConnection(config);
    console.log('Connected to MySQL database');

    // Create table if not exists
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS threads (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        content TEXT NOT NULL,
        author VARCHAR(100) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);
    console.log('Table created or already exists');

    // Insert sample data
    await connection.execute(`
      INSERT INTO threads (title, content, author)
      VALUES
        ('Welcome to the Thread Section!', 'This is the first thread on our platform. Feel free to share your thoughts and ideas!', 'Admin'),
        ('Azure Deployment Tips', 'Has anyone successfully deployed Next.js to Azure? Share your experiences!', 'DevUser'),
        ('Getting Started with MySQL', 'I\\'m new to MySQL. Any tips for beginners?', 'NewDev')
    `);
    console.log('Sample data inserted');

  } catch (error) {
    console.error('Error setting up database:', error);
  } finally {
    if (connection) {
      await connection.end();
      console.log('Connection closed');
    }
  }
}

setupDatabase();