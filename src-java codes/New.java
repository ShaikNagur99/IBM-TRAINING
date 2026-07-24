import java.util.Scanner;

public class New {
    public static void main(String[] args) {

        Scanner sc = new Scanner(System.in);

        // --------- IF ----------
        System.out.print("Enter a number: ");
        int num = sc.nextInt();

        if (num > 0) {
            System.out.println("Positive Number");
        }

        // --------- ELSE IF ----------
        System.out.print("\nEnter Marks: ");
        int marks = sc.nextInt();

        if (marks >= 90) {
            System.out.println("Grade A");
        } else if (marks >= 75) {
            System.out.println("Grade B");
        } else if (marks >= 50) {
            System.out.println("Grade C");
        } else {
            System.out.println("Fail");
        }

        sc.nextLine(); // Consume the leftover newline

        // --------- NESTED IF ----------
        System.out.print("\nEnter Login ID: ");
        String id = sc.nextLine();

        System.out.print("Enter Password: ");
        String pwd = sc.nextLine();

        if (id.equals("Prasunamba")) {
            if (pwd.equals("4321")) {
                System.out.println("Welcome!");
            } else {
                System.out.println("Wrong Password");
            }
        } else {
            System.out.println("Invalid Login ID");
        }

        sc.close();
    }
}