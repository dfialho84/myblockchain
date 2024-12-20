import express from "express";

const app = express();

// Middleware para parsear JSON
app.use(express.json());

// Rota de exemplo
app.get("/", (req, res) => {
    res.send("Hello, World!");
});

export default app;
