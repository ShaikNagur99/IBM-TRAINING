interface Math{
    int compute(int a,int b);

}






public class Lamda4 {
    public static void main(String[] args) {


        Math add = (a, b) -> a + b;
        Math mul = (a, b) -> a * b;
        Math div = (a, b) -> a / b;
        Math sub = (a, b) -> a - b;

        System.out.println("addition:" +add.compute(10,20));
        System.out.println("multiplication:" +mul.compute(10,20));
        System.out.println("division:" +div.compute(10,20));
        System.out.println("substract:" +sub.compute(10,20));


    }

}
