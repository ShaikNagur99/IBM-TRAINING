package com.example.bankingapp;

import java.math.BigDecimal;
import java.util.UUID;

public record Account(String accountNumber, String holderName, BigDecimal balance) {

    public Account(String holderName) {
        this(UUID.randomUUID().toString().substring(0, 8).toUpperCase(), holderName, BigDecimal.ZERO);
    }

    public Account deposit(BigDecimal amount) {
        if (amount.compareTo(BigDecimal.ZERO) <= 0) {
            throw new IllegalArgumentException("Deposit amount must be positive");
        }
        return new Account(accountNumber, holderName, balance.add(amount));
    }

    public Account withdraw(BigDecimal amount) {
        if (amount.compareTo(BigDecimal.ZERO) <= 0) {
            throw new IllegalArgumentException("Withdrawal amount must be positive");
        }
        if (amount.compareTo(balance) > 0) {
            throw new IllegalArgumentException("Insufficient funds");
        }
        return new Account(accountNumber, holderName, balance.subtract(amount));
    }
}
