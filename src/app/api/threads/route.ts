import { NextRequest, NextResponse } from 'next/server';
import { getPool } from '@/lib/db';

export async function GET() {
  try {
    const pool = await getPool();
    
    // Create table if not exists
    await pool.execute(`
      CREATE TABLE IF NOT EXISTS threads (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        content TEXT NOT NULL,
        author VARCHAR(100) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);
    
    const [rows] = await pool.execute(`
      SELECT id, title, content, author, created_at, updated_at
      FROM threads
      ORDER BY created_at DESC
    `);
    
    return NextResponse.json({ threads: rows }, { status: 200 });
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch threads' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, content, author } = body;

    if (!title || !content || !author) {
      return NextResponse.json(
        { error: 'Title, content, and author are required' },
        { status: 400 }
      );
    }

    const pool = await getPool();
    await pool.execute(`
      INSERT INTO threads (title, content, author, created_at, updated_at)
      VALUES (?, ?, ?, NOW(), NOW())
    `, [title, content, author]);

    const [rows] = await pool.execute(`
      SELECT id, title, content, author, created_at, updated_at
      FROM threads
      WHERE id = LAST_INSERT_ID()
    `);

    return NextResponse.json(
      { thread: (rows as any)[0] },
      { status: 201 }
    );
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { error: 'Failed to create thread' },
      { status: 500 }
    );
  }
}
