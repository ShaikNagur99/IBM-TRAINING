package org.example;

import org.example.Demo06_PerformanceService;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.assertTimeout;
import java.time.Duration;

class Demo06_TimeoutTest_PerformanceCheck {

    // Passes
    @Test
    void testQuickExecutionPass() {

        Demo06_PerformanceService service = new Demo06_PerformanceService();

        assertTimeout(Duration.ofMillis(500), () -> {
            service.quickOperation(); // completes in 100ms
        });
    }

    // Fails
    @Test
    void testSlowExecutionFail() {

        Demo06_PerformanceService service = new Demo06_PerformanceService();

        assertTimeout(Duration.ofMillis(500), () -> {
            service.slowOperation(); // takes 1000ms
        });
    }

    // Fails
    @Test
    void testUnrealisticTimeoutFail() {

        Demo06_PerformanceService service = new Demo06_PerformanceService();

        assertTimeout(Duration.ofMillis(50), () -> {
            service.quickOperation(); // takes 100ms
        });
    }
}