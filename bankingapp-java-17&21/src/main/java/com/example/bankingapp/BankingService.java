package com.example.bankingapp;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

public class BankingService {

    private final Map<String, Account> accounts = new LinkedHashMap<>();
    private final List<Transaction> transactions = new ArrayList<>();

    public Account createAccount(String holderName) {
        if (holderName == null || holderName.isBlank()) {
            throw new IllegalArgumentException("Holder name is required");
        }
        Account account = new Account(holderName.trim());
        accounts.put(account.accountNumber(), account);
        return account;
    }

    public Account deposit(String accountNumber, BigDecimal amount) {
        Account current = findAccount(accountNumber)
                .orElseThrow(() -> new IllegalArgumentException("Account not found"));
        Account updated = current.deposit(amount);
        accounts.put(updated.accountNumber(), updated);
        transactions.add(new Transaction("DEPOSIT", updated.accountNumber(), null, amount, Instant.now()));
        return updated;
    }

    public Account withdraw(String accountNumber, BigDecimal amount) {
        Account current = findAccount(accountNumber)
                .orElseThrow(() -> new IllegalArgumentException("Account not found"));
        Account updated = current.withdraw(amount);
        accounts.put(updated.accountNumber(), updated);
        transactions.add(new Transaction("WITHDRAW", updated.accountNumber(), null, amount, Instant.now()));
        return updated;
    }

    public void transfer(String fromAccount, String toAccount, BigDecimal amount) {
        Account source = findAccount(fromAccount)
                .orElseThrow(() -> new IllegalArgumentException("Source account not found"));
        Account target = findAccount(toAccount)
                .orElseThrow(() -> new IllegalArgumentException("Target account not found"));

        Account updatedSource = source.withdraw(amount);
        Account updatedTarget = target.deposit(amount);

        accounts.put(updatedSource.accountNumber(), updatedSource);
        accounts.put(updatedTarget.accountNumber(), updatedTarget);
        transactions.add(new Transaction("TRANSFER", fromAccount, toAccount, amount, Instant.now()));
    }

    public Optional<Account> findAccount(String accountNumber) {
        return Optional.ofNullable(accounts.get(accountNumber));
    }

    public List<Account> getAccounts() {
        return List.copyOf(accounts.values());
    }

    public List<Transaction> getTransactions() {
        return List.copyOf(transactions);
    }
}
