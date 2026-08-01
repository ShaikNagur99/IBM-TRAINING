package com.example.Mockito.service;



import com.example.Mockito.model.BankAccount;
import com.example.Mockito.repository.BankRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class BankServiceTest {

    @Mock
    private BankRepository repository;

    @InjectMocks
    private BankService service;

    @Test
    void testDeposit() {

        BankAccount account = new BankAccount("123", 500);

        when(repository.findByAccountNumber("123"))
                .thenReturn(account);

        service.deposit("123", 200);

        assertEquals(700, account.getBalance());

        verify(repository).save(account);
    }

    @Test
    void testWithdrawSuccess() {

        BankAccount account = new BankAccount("123", 500);

        when(repository.findByAccountNumber("123"))
                .thenReturn(account);

        service.withdraw("123", 200);

        assertEquals(300, account.getBalance());

        verify(repository).save(account);
    }

    @Test
    void testWithdrawInsufficientFunds() {

        BankAccount account = new BankAccount("123", 100);

        when(repository.findByAccountNumber("123"))
                .thenReturn(account);

        Exception ex = assertThrows(
                IllegalArgumentException.class,
                () -> service.withdraw("123", 200)
        );

        assertEquals("Insufficient funds", ex.getMessage());

        verify(repository, never()).save(account);
    }
}