package com.bank.demo;

import java.util.Arrays;
import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

public class BankingApp {
    public static void main(String[] args) {
        Customer alice = new Customer("C001", "Alice", 1000.0);
        Customer bob = new Customer("C002", "Bob", 750.0);

        alice.deposit(300.0);
        bob.deposit(250.0);

        Payment cardPayment = new CreditCardPayment("4111111111111111", 180.0, "Groceries");
        cardPayment.process(alice);

        Payment anotherPayment = customer -> {
            boolean success = customer.withdraw(90.0);
            if (success) {
                System.out.println("Processed online payment for " + customer.getName());
            }
        };
        anotherPayment.process(bob);

        System.out.println("\nCustomer balances:");
        List<Customer> customers = Arrays.asList(alice, bob);
        customers.stream()
                .sorted(Comparator.comparing(Customer::getName))
                .forEach(customer -> System.out.println(customer));

        System.out.println("\nRecent transactions for Alice:");
        alice.recentTransactions(5).forEach(System.out::println);

        System.out.println("\nTransaction summary by type:");
        Map<String, Long> summary = customers.stream()
                .flatMap(customer -> customer.getTransactions().stream())
                .collect(Collectors.groupingBy(Transaction::getType, Collectors.counting()));
        summary.forEach((type, count) -> System.out.println(type + " => " + count));
    }
}
