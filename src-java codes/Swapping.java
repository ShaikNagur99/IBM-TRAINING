public class Swapping {
    public static void main(String[] args) {

        int a = 10;
        int b = 20;

        int temp;

        temp = a;   // Store the value of a
        a = b;      // Assign b to a
        b = temp;   // Assign stored value to b

        System.out.println("a = " + a);
        System.out.println("b = " + b);
    }
}