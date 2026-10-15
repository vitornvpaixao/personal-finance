import express from 'express';
import { accountsRouter } from "./accounts/accountsRoutes.js";

export const app = express();
app.use(express.json());
app.use("/api/accounts", accountsRouter);

app.listen(3000);
