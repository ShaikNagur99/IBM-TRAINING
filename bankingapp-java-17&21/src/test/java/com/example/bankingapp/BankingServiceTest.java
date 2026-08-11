package com.example.bankingapp;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.math.BigDecimal;
import org.junit.jupiter.api.Test;

class BankingServiceTest {

    @Test
    void depositUpdatesBalance() {
        BankingService service = new BankingService();
        Account account = service.createAccount("Ada");

        service.deposit(account.accountNumber(), new BigDecimal("100"));

        Account updated = service.findAccount(account.accountNumber()).orElseThrow();
        assertEquals(new BigDecimal("100"), updated.balance());
    }

    @Test
    void transferMovesFundsBetweenAccounts() {
        BankingService service = new BankingService();
        Account source = service.createAccount("Grace");
        Account target = service.createAccount("Linus");

        service.deposit(source.accountNumber(), new BigDecimal("200"));
        service.transfer(source.accountNumber(), target.accountNumber(), new BigDecimal("50"));

        Account updatedSource = service.findAccount(source.accountNumber()).orElseThrow();
        Account updatedTarget = service.findAccount(target.accountNumber()).orElseThrow();

        assertEquals(new BigDecimal("150"), updatedSource.balance());
        assertEquals(new BigDecimal("50"), updatedTarget.balance());
        assertTrue(service.getTransactions().size() >= 1);
    }
}
