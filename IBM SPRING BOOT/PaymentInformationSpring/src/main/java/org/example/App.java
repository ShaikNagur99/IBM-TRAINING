package org.example;

import java.util.Scanner;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

public class App {

    public static void main(String[] args) {

        ApplicationContext context =
                new ClassPathXmlApplicationContext("applicationContext.xml");

        OrderService orderService =
                (OrderService) context.getBean("orderService");

        Scanner sc = new Scanner(System.in);

        System.out.print("Enter payment amount: ");
        double amount = sc.nextDouble();

        orderService.placeOrder(amount);

        sc.close();
    }
}