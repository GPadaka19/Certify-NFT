import express from "express";
import dotenv from "dotenv";
import cors from "cors";

// Load .env
dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// Test route
app.get("/", (_, res) => {
  res.send("Certify-NFT Backend is running ✅");
});

// Mount API routes (nanti kita isi)
import mintRouter from "./routes/mint";
app.use("/api/mint", mintRouter);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});