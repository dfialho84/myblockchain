import express from "express";
import dotenv from "dotenv";
import blockchainRoutes from "./routes/blockchain-routes";
import walletRoutes from "./routes/wallet-routes";
import transactionRoutes from "./routes/transaction-routes";
import config from "./config";

dotenv.config();

const VERSION = process.env.API_VERSION || "v1";

const app = express();

app.use(express.json());

config.init(app);

const API_PREFIX = `/api/${VERSION}`;

app.use(`${API_PREFIX}/blocks`, blockchainRoutes);
app.use(`${API_PREFIX}/wallets`, walletRoutes);
app.use(`${API_PREFIX}/transactions`, transactionRoutes);

export default app;
