package com.example.bankingapp;

import com.example.bankingapp.entity.Account;
import com.example.bankingapp.repository.AccountRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
@EnableCaching
public class BankingappApplication {

    public static void main(String[] args) {
        SpringApplication.run(BankingappApplication.class, args);
    }

    @Bean
    CommandLineRunner loadData(AccountRepository accountRepository) {
        return args -> {
            accountRepository.save(
                new Account(101L, "Shaik Nagurvali", 50000.0)
            );

            accountRepository.save(
                new Account(102L, "Test User", 25000.0)
            );

            System.out.println("Test accounts inserted successfully!");
        };
    }
}