import java.sql.SQLOutput;
import java.util.Deque;
import java.util.ArrayDeque;

public class DemoStack {
    public static void main(String[] args) {
        Deque<Integer> stack =new ArrayDeque<>();
        stack.push(2);
        stack.push(5);
        stack.push(8);
        System.out.println(stack);
        //stack.pop();
        //System.out.println(stack);

        System.out.println( stack.peek());






    }

}
