package com.example.bankingapp;

import java.math.BigDecimal;
import java.util.Scanner;

public class BankingApp {

    private final BankingService service = new BankingService();
    private final Scanner scanner = new Scanner(System.in);

    public static void main(String[] args) {
        new BankingApp().run();
    }

    private void run() {
        while (true) {
            System.out.println("\n=== Mini Banking App ===");
            System.out.println("1. Create account");
            System.out.println("2. Deposit money");
            System.out.println("3. Withdraw money");
            System.out.println("4. Transfer money");
            System.out.println("5. View accounts");
            System.out.println("6. View transactions");
            System.out.println("0. Exit");
            System.out.print("Choose an option: ");

            String input = scanner.nextLine().trim();
            int choice = parseChoice(input);

            switch (choice) {
                case 1 -> createAccount();
                case 2 -> deposit();
                case 3 -> withdraw();
                case 4 -> transfer();
                case 5 -> viewAccounts();
                case 6 -> viewTransactions();
                case 0 -> {
                    System.out.println("Goodbye!");
                    return;
                }
                default -> System.out.println("Invalid option. Please try again.");
            }
        }
    }

    private void createAccount() {
        System.out.print("Enter holder name: ");
        String holderName = scanner.nextLine().trim();
        var account = service.createAccount(holderName);
        System.out.println("Account created successfully: " + account);
    }

    private void deposit() {
        System.out.print("Enter account number: ");
        String accountNumber = scanner.nextLine().trim();
        System.out.print("Enter amount: ");
        BigDecimal amount = readAmount();
        try {
            var updated = service.deposit(accountNumber, amount);
            System.out.println("Deposit successful: " + updated);
        } catch (IllegalArgumentException ex) {
            System.out.println(ex.getMessage());
        }
    }

    private void withdraw() {
        System.out.print("Enter account number: ");
        String accountNumber = scanner.nextLine().trim();
        System.out.print("Enter amount: ");
        BigDecimal amount = readAmount();
        try {
            var updated = service.withdraw(accountNumber, amount);
            System.out.println("Withdrawal successful: " + updated);
        } catch (IllegalArgumentException ex) {
            System.out.println(ex.getMessage());
        }
    }

    private void transfer() {
        System.out.print("Enter source account number: ");
        String from = scanner.nextLine().trim();
        System.out.print("Enter target account number: ");
        String to = scanner.nextLine().trim();
        System.out.print("Enter amount: ");
        BigDecimal amount = readAmount();
        try {
            service.transfer(from, to, amount);
            System.out.println("Transfer completed successfully.");
        } catch (IllegalArgumentException ex) {
            System.out.println(ex.getMessage());
        }
    }

    private void viewAccounts() {
        service.getAccounts().forEach(System.out::println);
    }

    private void viewTransactions() {
        service.getTransactions().forEach(System.out::println);
    }

    private BigDecimal readAmount() {
        while (true) {
            try {
                return new BigDecimal(scanner.nextLine().trim());
            } catch (NumberFormatException ex) {
                System.out.print("Please enter a valid amount: ");
            }
        }
    }

    private int parseChoice(String input) {
        try {
            return Integer.parseInt(input);
        } catch (NumberFormatException ex) {
            return -1;
        }
    }
}
