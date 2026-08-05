import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BankService {
  accountHolder = 'Shaik Nagurvali';
  accountNumber = '123456789';
  branch = 'Hyderabad';
  balance = 50000;

  transactions = [
    {
      date: '05-Aug-2026',
      type: 'Deposit',
      amount: 5000,
    },
  ];

  deposit(amount: number) {
    this.balance += amount;

    this.transactions.push({
      date: new Date().toLocaleDateString(),
      type: 'Deposit',
      amount: amount,
    });
  }

  withdraw(amount: number) {
    if (amount > this.balance) {
      alert('Insufficient Balance');
      return;
    }

    this.balance -= amount;

    this.transactions.push({
      date: new Date().toLocaleDateString(),
      type: 'Withdraw',
      amount: amount,
    });
  }
}
