@FunctionalInterface
interface  OParameter{
    void display();
}
public class Zeroparameterized {
    public static void main(String[] args) {
        OParameter obj = ()
                -> System.out.println(
                "This is a zero-parameter lambda expression!");
        obj.display();
    }
}
