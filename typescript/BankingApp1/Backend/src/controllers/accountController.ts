import { Request, Response } from "express";
import { AccountService } from "../services/accountService";
import type { Account } from "../models/account";

const accountService = new AccountService();

const account: Account = {
    id: 101,
    name: "Nagurvali",
    age: 22,
    balance: 10000
};

export const getAccount = (req: Request, res: Response): void => {
    res.json(account);
};



export const withdrawAmount = (req: Request, res: Response): void => {
    const amount = Number(req.body.amount);

    accountService.withdraw(account, amount);

    res.json({
        message: "Withdrawal Completed",
        account: account
    });
};

export const depositAmount = (req: Request, res: Response): void => {

    console.log("Request Body:", req.body);
    console.log("Before Deposit:", account);

    const amount = Number(req.body.amount);

    accountService.deposit(account, amount);

    console.log("After Deposit:", account);

    res.json({
        message: "Deposit Successful",
        account: account
    });
};