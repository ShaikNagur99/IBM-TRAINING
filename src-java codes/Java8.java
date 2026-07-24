import java.util.Arrays;
import java.util.List;

public class Java8 {
    public static void main(String[] args) {
        Runnable r=new Runnable() {
            @Override
            public void run() {
                System.out.println("Before: Shaik1");

            }
        };
        Runnable r2=()->
                System.out.println("After: shaik2");

        List<String> names= Arrays.asList("shaik,hi,hello");
        names.forEach(q-> System.out.println("Name: " +q));
        r.run();
        r2.run();

    }
}
