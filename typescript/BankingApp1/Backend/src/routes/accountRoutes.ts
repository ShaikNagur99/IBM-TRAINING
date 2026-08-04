import express from "express";
import {
    getAccount,
    depositAmount,
    withdrawAmount
} from "../controllers/accountController";

const router = express.Router();

// Get Account Details
router.get("/account", getAccount);

// Deposit Amount
router.post("/deposit", depositAmount);

// Withdraw Amount
router.post("/withdraw", withdrawAmount);

export default router;