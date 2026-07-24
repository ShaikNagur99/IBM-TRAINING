import java.util.Scanner;

public class CustomerNames {
    public static void main(String[] args) {

        Scanner sc = new Scanner(System.in);

        String[] cust = new String[5];

        System.out.println("Enter 5 Customer Names:");

        for (int i = 0; i < cust.length; i++) {
            cust[i] = sc.nextLine();
        }

        System.out.println("\nCustomer Names:");

        for (String name : cust) {
            System.out.println(name);
        }

        sc.close();
    }
}