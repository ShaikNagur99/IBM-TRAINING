import java.util.Scanner;

public class SwitchDemo {
    public static void main(String[] args) {

        Scanner sc = new Scanner(System.in);

        System.out.println("Enter a number (1-3): ");
        int choice = sc.nextInt();

        switch (choice) {
            case 1:
                System.out.println("You selected One");
                break;

            case 2:
                System.out.println("You selected Two");
                break;

            case 3:
                System.out.println("You selected Three");
                break;

            default:
                System.out.println("Invalid Choice");
        }

        sc.close();
    }
}