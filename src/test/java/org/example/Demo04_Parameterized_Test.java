package org.example;

import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvSource;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class Demo04_Parameterized_Test {

    @ParameterizedTest
    @CsvSource({
            "Java,4",
            "JUnit,5",
            "Hello,5",
            "IBM,3"
    })
    void testStringLength(String input, int expected) {

        Demo04_StringUtility obj = new Demo04_StringUtility();

        assertEquals(expected, obj.getLength(input));
    }
}
