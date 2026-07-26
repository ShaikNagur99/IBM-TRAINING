package org.example;
public class Demo06_PerformanceService {

    // Completes in about 100 milliseconds
    public void quickOperation() throws InterruptedException {
        Thread.sleep(100);
    }

    // Completes in about 1000 milliseconds
    public void slowOperation() throws InterruptedException {
        Thread.sleep(1000);
    }
}