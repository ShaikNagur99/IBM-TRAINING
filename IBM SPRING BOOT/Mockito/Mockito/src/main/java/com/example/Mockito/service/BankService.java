package com.example.Mockito.service;


import com.example.Mockito.model.BankAccount;
import com.example.Mockito.repository.BankRepository;
import org.springframework.stereotype.Service;

@Service
public class BankService {

    private final BankRepository repository;

    public BankService(BankRepository repository) {
        this.repository = repository;
    }

    public void deposit(String accountNumber, double amount) {

        BankAccount account = repository.findByAccountNumber(accountNumber);

        account.setBalance(account.getBalance() + amount);

        repository.save(account);
    }

    public void withdraw(String accountNumber, double amount) {

        BankAccount account = repository.findByAccountNumber(accountNumber);

        if (account.getBalance() < amount) {
            throw new IllegalArgumentException("Insufficient funds");
        }

        account.setBalance(account.getBalance() - amount);

        repository.save(account);
    }
}
