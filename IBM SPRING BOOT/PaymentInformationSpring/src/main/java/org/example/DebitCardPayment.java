package org.example;

public class DebitCardPayment implements PaymentService {

    @Override
    public void makePayment(double amount) {
        System.out.println("Payment made using Debit Card");
    }
}