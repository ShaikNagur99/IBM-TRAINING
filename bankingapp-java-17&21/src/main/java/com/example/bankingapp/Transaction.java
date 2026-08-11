package com.example.bankingapp;

import java.math.BigDecimal;
import java.time.Instant;

public record Transaction(String type, String sourceAccount, String targetAccount, BigDecimal amount, Instant timestamp) {
}
