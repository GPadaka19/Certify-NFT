import { Request, Response } from "express";

export const handleMint = async (req: Request, res: Response) => {
  try {
    // Nanti kita isi logic mint NFT ke smart contract
    res.status(200).json({ message: "Mint endpoint hit. Coming soon!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};
