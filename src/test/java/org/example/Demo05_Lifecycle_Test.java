package org.example;

import org.junit.jupiter.api.*;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class Demo05_Lifecycle_Test {

    LifeCycleDemo calc;

    @BeforeAll
    static void beforeAllTests() {
        System.out.println("Before All Tests");
    }

    @BeforeEach
    void setUp() {
        System.out.println("Setup - Creating Calculator Object");
        calc = new LifeCycleDemo();
    }

    @Test
    void testAddition() {
        System.out.println("Executing Addition Test");
        assertEquals(15, calc.add(10, 5));
    }

    @Test
    void testMultiplication() {
        System.out.println("Executing Multiplication Test");
        assertEquals(50, calc.multiply(10, 5));
    }

    @AfterEach
    void tearDown() {
        System.out.println("TearDown - Destroying Calculator Object");
        calc = null;
    }

    @AfterAll
    static void afterAllTests() {
        System.out.println("After All Tests");
    }
}
