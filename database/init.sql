-- SQL Server Database Setup Script for Threads
-- Run this script to create the database and table

-- Create database (if not exists)
IF NOT EXISTS (SELECT * FROM sys.databases WHERE name = 'ThreadsDB')
BEGIN
    CREATE DATABASE ThreadsDB;
END
GO

-- Use the database
USE ThreadsDB;
GO

-- Create Threads table
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'Threads')
BEGIN
    CREATE TABLE Threads (
        id INT IDENTITY(1,1) PRIMARY KEY,
        title NVARCHAR(255) NOT NULL,
        content NVARCHAR(MAX) NOT NULL,
        author NVARCHAR(100) NOT NULL,
        created_at DATETIME2 NOT NULL DEFAULT GETDATE(),
        updated_at DATETIME2 NOT NULL DEFAULT GETDATE()
    );

    -- Create index on created_at for faster sorting
    CREATE INDEX idx_threads_created_at ON Threads(created_at DESC);
END
GO

-- Insert some sample data
INSERT INTO Threads (title, content, author, created_at, updated_at)
VALUES 
    ('Welcome to the Thread Section!', 'This is the first thread on our platform. Feel free to share your thoughts and ideas!', 'Admin', GETDATE(), GETDATE()),
    ('Azure Deployment Tips', 'Has anyone successfully deployed Next.js to Azure? Share your experiences!', 'DevUser', GETDATE(), GETDATE()),
    ('Getting Started with SQL Server', 'I''m new to SQL Server. Any tips for beginners?', 'NewDev', GETDATE(), GETDATE());
GO

-- Verify the data
SELECT * FROM Threads ORDER BY created_at DESC;
GO
