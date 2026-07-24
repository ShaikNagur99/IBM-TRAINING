@FunctionalInterface
interface name{
   public void display();
}

public class Lambda3 {
    public static void main(String[] args) {
        name n=()-> System.out.println("welcome");
        n.display();

            }
        }




