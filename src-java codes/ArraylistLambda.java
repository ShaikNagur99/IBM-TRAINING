import java.util.ArrayList;
public class ArraylistLambda {
    public static void main(String[] args){


        ArrayList<Integer> list = new ArrayList<>();
        list.add(10);
        list.add(25);
        list.add(30);


        System.out.println("All elements in array:");
        list.forEach(n -> System.out.println(n));


        System.out.println("Even elements:");
        list.forEach(n -> {
            if (n % 2 == 0)
                System.out.println(n);
        });
    }
}
