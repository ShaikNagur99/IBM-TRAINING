package org.example;

public class OrderService {

    private PaymentService paymentService;

    public OrderService() {
    }

    public void setPaymentService(PaymentService paymentService) {
        this.paymentService = paymentService;
    }

    public void placeOrder(double amount) {
        System.out.println("Order placed successfully.");
        paymentService.makePayment(amount);
    }
}