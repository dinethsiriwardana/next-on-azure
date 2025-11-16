# Thread Section Setup for Next.js on Azure

This application now includes a thread/discussion section powered by Microsoft SQL Server.

## Prerequisites

1. **SQL Server** - You need a running SQL Server instance. Options include:
   - Local SQL Server installation
   - SQL Server in Docker: `docker run -e "ACCEPT_EULA=Y" -e "SA_PASSWORD=YourStrong@Passw0rd" -p 1433:1433 --name sqlserver -d mcr.microsoft.com/mssql/server:2022-latest`
   - Azure SQL Database (recommended for production)

## Database Setup

### Option 1: Using SQL Server Management Studio (SSMS)
1. Open SSMS and connect to your SQL Server instance
2. Open the `database/init.sql` file
3. Execute the script to create the database and tables

### Option 2: Using sqlcmd
```bash
sqlcmd -S localhost -U sa -P 'YourStrong@Passw0rd' -i database/init.sql
```

### Option 3: Using Azure Data Studio
1. Open Azure Data Studio
2. Connect to your SQL Server instance
3. Open and run the `database/init.sql` file

## Environment Configuration

1. Copy or update `.env.local` with your SQL Server credentials:
```env
DB_SERVER=localhost
DB_DATABASE=ThreadsDB
DB_USER=sa
DB_PASSWORD=YourStrong@Passw0rd
DB_PORT=1433
DB_ENCRYPT=true
DB_TRUST_SERVER_CERTIFICATE=true
```

2. For Azure SQL Database, update the configuration:
```env
DB_SERVER=your-server.database.windows.net
DB_DATABASE=ThreadsDB
DB_USER=your-username
DB_PASSWORD=your-password
DB_PORT=1433
DB_ENCRYPT=true
DB_TRUST_SERVER_CERTIFICATE=false
```

## Running the Application

```bash
npm run dev
```

Visit http://localhost:3000 to see the application with the new thread section.

## Features

- ✅ Create new threads with title, content, and author name
- ✅ View all threads in real-time
- ✅ Responsive design with dark mode support
- ✅ SQL Server integration with connection pooling
- ✅ Type-safe API routes with TypeScript

## API Endpoints

- `GET /api/threads` - Fetch all threads
- `POST /api/threads` - Create a new thread

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   └── threads/
│   │       └── route.ts          # API routes for threads
│   └── page.tsx                   # Main page with thread section
├── components/
│   ├── ThreadForm.tsx            # Form to create threads
│   └── ThreadList.tsx            # Display list of threads
├── lib/
│   └── db.ts                     # Database connection utility
└── types/
    └── thread.ts                 # TypeScript types for threads
```

## Deploying to Azure

When deploying to Azure App Service:

1. Create an Azure SQL Database
2. Run the `init.sql` script on your Azure SQL Database
3. Configure environment variables in Azure App Service:
   - Go to Configuration → Application settings
   - Add all DB_* environment variables
4. Deploy your application

## Security Notes

- Never commit `.env.local` to version control
- Use strong passwords for production databases
- Enable firewall rules on Azure SQL Database
- Use managed identities when possible for authentication
- Rotate credentials regularly
