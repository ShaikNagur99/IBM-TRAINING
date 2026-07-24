import java.util.Scanner;
import java.util.Scanner;

public class Password {
    public static void main(String args[]) {

        Scanner sc = new Scanner(System.in);

        String id, pwd;

        while (true) {
            System.out.print("Enter Login ID: ");
            id = sc.nextLine();

            System.out.print("Enter Password: ");
            pwd = sc.nextLine();

            if (id.equals("Shaik") && pwd.equals("4321")) {
                System.out.println("Welcome!");
                break;
            } else {
                System.out.println("Invalid Login ID or Password. Try Again.\n");
            }
        }

        sc.close();
    }
}


