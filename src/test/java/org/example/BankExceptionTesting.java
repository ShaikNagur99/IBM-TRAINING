package org.example;

import org.junit.jupiter.api.Test;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertThrows;

public class BankExceptionTesting {

    @Test
    public void testwithdrawinsufficientfunds() {
        BankDemo b = new BankDemo("1457789", 200);
        Exception ex = assertThrows(IllegalArgumentException.class, () -> {
            b.withdraw(200.0);
        });

        assertEquals("Insufficient balance", ex.getMessage());
    }
    @Test
    void testWithdrawInsufficientFundsFail() {

        BankDemo account = new BankDemo("123", 100.0);

        Exception ex = assertThrows(IllegalArgumentException.class, () -> {
            account.withdraw(200.0);
        });

        // This assertion will fail
        assertEquals("Balance is low", ex.getMessage());
    }

}


