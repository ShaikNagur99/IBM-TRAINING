import java.util.LinkedList;
import java.util.Queue;
public class QueueDemo {
    public static void main(String[] args) {
        Queue<String> names= new LinkedList<>();
        names.add("ert");
        names.add("gty");
        names.add("tyui");
        System.out.println(names.peek());

    }

}
