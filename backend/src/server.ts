import express from 'express';
import { accountsRouter } from "./accounts/accountsRoutes.js";
import { testDatabaseConnection } from './db.js';

export const app = express();
app.use(express.json());
app.use("/api/accounts", accountsRouter);

async function startServer() {
    try {
        await testDatabaseConnection();
        
        app.listen(3000, () => console.log('Server is running on port: 3000'));
        
    } catch (error) {
        console.error("Database connection failed:", error);
        process.exit(1);
    }
}

startServer();
