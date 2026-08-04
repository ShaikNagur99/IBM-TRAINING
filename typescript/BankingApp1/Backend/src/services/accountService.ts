import type { Account } from "../models/account";

export class AccountService {

    deposit(account: Account, amount: number): void {
        account.balance += amount;
        console.log("Deposit Successful");
        console.log("Amount Deposited:", amount);
        console.log("Available Balance:", account.balance);
    }

    withdraw(account: Account, amount: number): void {

        if (amount <= account.balance) {
            account.balance -= amount;
            console.log("Withdrawal Successful");
            console.log("Amount Withdrawn:", amount);
            console.log("Available Balance:", account.balance);
        } else {
            console.log("Insufficient Balance");
        }
    }

    display(account: Account): void {
        console.log("---------------");
        console.log("Account Details");
        console.log("---------------");
        console.log("ID      :", account.id);
        console.log("Name    :", account.name);
        console.log("Age     :", account.age);
        console.log("Balance :", account.balance);
    }
}