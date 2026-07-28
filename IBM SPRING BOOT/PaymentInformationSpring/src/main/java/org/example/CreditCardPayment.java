package org.example;

public class CreditCardPayment implements PaymentService {

    @Override
    public void makePayment(double amount) {
        System.out.println("Payment of Rs." + amount + " made using Credit Card.");
    }
}