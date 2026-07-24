@FunctionalInterface
interface Demo {

    // One abstract method (SAM)
    void display();

    // Default method
    default void show() {
        System.out.println("Default Method");
    }
}

public class Lambda5 {
    public static void main(String[] args) {

        Demo d = () -> System.out.println("Abstract Method");

        d.display();
        d.show();
    }
}