import { NextRequest, NextResponse } from 'next/server';
import { getPool, sql } from '@/lib/db';

export async function GET() {
  try {
    const pool = await getPool();
    const result = await pool.request().query(`
      SELECT id, title, content, author, created_at, updated_at
      FROM Threads
      ORDER BY created_at DESC
    `);
    
    return NextResponse.json({ threads: result.recordset }, { status: 200 });
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
    const result = await pool
      .request()
      .input('title', sql.NVarChar(255), title)
      .input('content', sql.NVarChar(sql.MAX), content)
      .input('author', sql.NVarChar(100), author)
      .query(`
        INSERT INTO Threads (title, content, author, created_at, updated_at)
        OUTPUT INSERTED.*
        VALUES (@title, @content, @author, GETDATE(), GETDATE())
      `);

    return NextResponse.json(
      { thread: result.recordset[0] },
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
