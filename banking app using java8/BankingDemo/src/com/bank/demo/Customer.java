package com.bank.demo;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

public class Customer {
    private final String customerId;
    private final String name;
    private double balance;
    private final List<Transaction> transactions = new ArrayList<>();

    public Customer(String customerId, String name, double initialBalance) {
        this.customerId = customerId;
        this.name = name;
        this.balance = initialBalance;
    }

    public boolean deposit(double amount) {
        if (amount <= 0) {
            return false;
        }
        balance += amount;
        transactions.add(new Transaction("Deposit", amount, "Cash deposit"));
        return true;
    }

    public boolean withdraw(double amount) {
        if (amount <= 0 || amount > balance) {
            return false;
        }
        balance -= amount;
        transactions.add(new Transaction("Withdrawal", amount, "Cash withdrawal"));
        return true;
    }

    public List<Transaction> recentTransactions(int limit) {
        return transactions.stream()
                .sorted(Comparator.comparing(Transaction::getTimestamp).reversed())
                .limit(limit)
                .collect(Collectors.toList());
    }

    public double getBalance() {
        return balance;
    }

    public String getName() {
        return name;
    }

    public String getCustomerId() {
        return customerId;
    }

    public List<Transaction> getTransactions() {
        return transactions;
    }

    @Override
    public String toString() {
        return name + " (" + customerId + ") - Balance: $" + balance;
    }
}
