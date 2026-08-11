package com.bank.demo;

public class CreditCardPayment implements Payment {
    private final String cardNumber;
    private final double amount;
    private final String description;

    public CreditCardPayment(String cardNumber, double amount, String description) {
        this.cardNumber = cardNumber;
        this.amount = amount;
        this.description = description;
    }

    @Override
    public void process(Customer customer) {
        if (customer.withdraw(amount)) {
            System.out.println("Processed credit card payment for " + customer.getName() + " using card " + maskCard(cardNumber));
        } else {
            System.out.println("Payment failed. Insufficient balance for " + customer.getName());
        }
    }

    @Override
    public String paymentLabel() {
        return "Credit card payment";
    }

    private String maskCard(String cardNumber) {
        return "****-****-****-" + cardNumber.substring(cardNumber.length() - 4);
    }
}
