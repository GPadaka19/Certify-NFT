import express from "express";
import { handleMint } from "../controllers/mintControllers";

const router = express.Router();

router.post("/", handleMint);

export default router;