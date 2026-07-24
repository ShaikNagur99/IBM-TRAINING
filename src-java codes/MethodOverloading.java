public class MethodOverloading {

    public void add(int sum, int mul) {
        System.out.println("Sum: " + (sum + mul));
    }

    public void add(char a, String q) {
        System.out.println("Character: " + a);
        System.out.println("String: " + q);
    }

    public static void main(String[] args) {

        MethodOverloading obj = new MethodOverloading();

        obj.add(10, 20);
        obj.add('A', "Java");
    }
}