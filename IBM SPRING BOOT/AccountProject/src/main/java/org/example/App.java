package org.example;

import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

public class App {

    public static void main(String[] args) {

        ApplicationContext context =
                new ClassPathXmlApplicationContext("applicationContext.xml");

        // Bank Account
        BankAccount account =
                context.getBean("bankAccount", BankAccount.class);

        account.display();

        System.out.println();

        // Inner Bean
        Customer customer =
                context.getBean("customer", Customer.class);

        customer.display();

        System.out.println();

        // Singleton Scope
        BankAccount acc1 =
                context.getBean("singletonAccount", BankAccount.class);

        BankAccount acc2 =
                context.getBean("singletonAccount", BankAccount.class);

        System.out.println("Singleton same object? " + (acc1 == acc2));

        // Prototype Scope
        BankAccount acc3 =
                context.getBean("prototypeAccount", BankAccount.class);

        BankAccount acc4 =
                context.getBean("prototypeAccount", BankAccount.class);

        System.out.println("Prototype same object? " + (acc3 == acc4));
    }
}