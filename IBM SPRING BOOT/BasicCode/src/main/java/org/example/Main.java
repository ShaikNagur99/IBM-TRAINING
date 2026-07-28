package org.example;

import org.example.pojo.Student;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

public class Main {

    public static void main(String[] args) {

        ApplicationContext context =
                new ClassPathXmlApplicationContext("bean-factory-demo.xml");

        Student student = context.getBean("student", Student.class);

        student.display();
    }
}