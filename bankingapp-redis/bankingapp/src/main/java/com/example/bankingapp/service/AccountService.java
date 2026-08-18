package com.example.bankingapp.service;

import com.example.bankingapp.entity.Account;
import com.example.bankingapp.repository.AccountRepository;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.CachePut;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

@Service
public class AccountService {

    private final AccountRepository accountRepository;

    public AccountService(AccountRepository accountRepository) {
        this.accountRepository = accountRepository;
    }

    // Cache-Aside
    @Cacheable(value = "accounts", key = "#accountId")
    public Account getAccountDetails(Long accountId) {

        System.out.println("Fetching account from database...");

        return accountRepository.findById(accountId)
                .orElseThrow();
    }

    // Update database and cache
    @CachePut(value = "accounts", key = "#account.id")
    public Account updateAccount(Account account) {

        System.out.println("Updating account...");

        return accountRepository.save(account);
    }

    // Delete database record and remove cache
    @CacheEvict(value = "accounts", key = "#accountId")
    public void deleteAccount(Long accountId) {

        System.out.println("Deleting account...");

        accountRepository.deleteById(accountId);
    }
}