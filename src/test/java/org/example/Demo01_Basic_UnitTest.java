
package org.example;

import org.junit.jupiter.api.Test;


import static org.junit.jupiter.api.Assertions.assertEquals;

class Demo01_Basic_UnitTest {

    @Test
    void testAddition() {
        Demo_1calculator calc = new Demo_1calculator();
        assertEquals(15, calc.add(10, 5),"correct");
    }
    @Test
    void testAdditionFail() {
        Demo_1calculator calc = new Demo_1calculator();

        // This test will fail intentionally
        assertEquals(20, calc.add(10, 5), "Expected 20 but actual is 15");
    }
}
