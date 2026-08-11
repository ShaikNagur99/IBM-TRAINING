package com.bank.demo;

@FunctionalInterface
public interface Payment {
    void process(Customer customer);

    default String paymentLabel() {
        return "Generic payment";
    }
}
