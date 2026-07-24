import java.util.ArrayList;
import java.util.function.BinaryOperator;
import java.util.function.Function;
import java.util.function.Supplier;

public class MethodReference {

    // Static method
    public static int maximum(int a, int b) {
        return (a > b) ? a : b;
    }

    public static void main(String[] args) {

        // 1. Static Method Reference
        BinaryOperator<Integer> max = MethodReference::maximum;
        System.out.println("Maximum = " + max.apply(10, 20));

        // 2. Instance Method Reference
        Function<String, String> lower = String::toLowerCase;
        System.out.println("Lower Case = " + lower.apply("HELLO JAVA"));

        // 3. Constructor Method Reference
        Supplier<ArrayList<String>> list = ArrayList::new;

        ArrayList<String> names = list.get();
        names.add("Java");
        names.add("Python");

        System.out.println("List = " + names);
    }
}