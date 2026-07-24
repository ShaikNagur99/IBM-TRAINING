public class AssertionDemo {
    public static void main(String[] args) {
        int age=20;
        assert age>=18:"cannot vote";
        System.out.println("u r:" +age);

    }
}
