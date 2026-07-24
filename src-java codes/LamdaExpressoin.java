interface Op{
    int calculate(int a,int b);

}




public class LamdaExpressoin {
    public static void main(String[] args) {


        Op add = (a, b) -> a + b;
        Op mul = (a, b) -> a * b;


        System.out.println("addition: " +add.calculate(10,20));
        System.out.println("multiplication: "+add.calculate(20,30));

    }

}
