import { Router } from "express";
import { getAllBlocks } from "../controllers/blockchain-controller";

const router = Router();

router.get("/", getAllBlocks);

export default router;
