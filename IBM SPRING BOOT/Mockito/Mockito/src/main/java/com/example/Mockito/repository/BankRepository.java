package com.example.Mockito.repository;

import com.example.Mockito.model.BankAccount;

public interface BankRepository {

    BankAccount findByAccountNumber(String accountNumber);

    void save(BankAccount account);

}