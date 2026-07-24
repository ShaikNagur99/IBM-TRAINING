@FunctionalInterface
interface Demo6 {

    void display();    // Only abstract method

    default void show() {
        System.out.println("Default Method 1");
    }

    default void print() {
        System.out.println("Default Method 2");
    }   }
    public class Lambda6{
        public static void main(String[] args) {
            Demo6 d1=()-> System.out.println(" 1 Abstract method");
            d1.display();
            d1.show();
            d1.print();
        }

    }
