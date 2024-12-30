import express from "express";
import dotenv from "dotenv";
import blockchainRoutes from "./routes/blockchain-routes";
import config from "./config";

dotenv.config();

const VERSION = process.env.API_VERSION || "v1";

const app = express();

app.use(express.json());

config.init(app);

app.use(`/api/${VERSION}/blocks`, blockchainRoutes);

app.get("/", (req, res) => {
    res.send("Hello, World!");
});

export default app;
