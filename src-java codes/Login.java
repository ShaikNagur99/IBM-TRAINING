import java.util.Scanner;

public class Login {
    public static void main(String[] args) {

        Scanner sc = new Scanner(System.in);

        String id, pwd;

        do {
            System.out.print("Enter Login ID: ");
            id = sc.nextLine();

            System.out.print("Enter Password: ");
            pwd = sc.nextLine();

            if (!(id.equals("Shaik") && pwd.equals("4321"))) {
                System.out.println("Invalid Login ID or Password. Try Again.\n");
            }

        } while (!(id.equals("Shaik") && pwd.equals("4321")));

        System.out.println("Welcome!");

        sc.close();
    }
}
