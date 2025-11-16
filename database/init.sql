-- MySQL Database Setup Script for Threads
-- Run this script to create the table

-- Create Threads table
CREATE TABLE IF NOT EXISTS threads (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    author VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create index on created_at for faster sorting
CREATE INDEX idx_threads_created_at ON threads(created_at DESC);

-- Insert some sample data
INSERT INTO threads (title, content, author)
VALUES
    ('Welcome to the Thread Section!', 'This is the first thread on our platform. Feel free to share your thoughts and ideas!', 'Admin'),
    ('Azure Deployment Tips', 'Has anyone successfully deployed Next.js to Azure? Share your experiences!', 'DevUser'),
    ('Getting Started with MySQL', 'I\'m new to MySQL. Any tips for beginners?', 'NewDev');


SELECT * FROM threads ORDER BY created_at DESC;
