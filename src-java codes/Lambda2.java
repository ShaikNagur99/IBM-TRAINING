import java.util.function.Function;
import java.util.function.Predicate;
import java.util.function.Supplier;

@FunctionalInterface
interface Test1{
    public void testrr();

}

public class Lambda2 {
    public static void main(String[] args) {
        Function<String,Integer> length=s -> s.length();
        System.out.println(length.apply("shaik"));
        Predicate<String> p=s->s.length()>=5;
        System.out.println(p.test("shaik"));


    }
}
