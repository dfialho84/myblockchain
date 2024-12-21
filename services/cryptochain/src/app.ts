import express from "express";
import blockchainRoutes from "./routes/blockchain-routes";

const VERSION = "v1";

const app = express();

// Middleware para parsear JSON
app.use(express.json());

app.use(`/api/${VERSION}/blocks`, blockchainRoutes);

// Rota de exemplo
app.get("/", (req, res) => {
    res.send("Hello, World!");
});

export default app;
