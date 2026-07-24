import java.lang.module.FindException;
import java.util.LinkedList;

public class DemoLinkedList{
    public static void main(String[] args) {
        LinkedList<String> names=new LinkedList<>();
        names.add("seeta");
        names.add("geeta");
        names.add("riyanparag");
        System.out.println(names);
        names.remove(1);
        System.out.println(names);
        names.addFirst("kohli");
        System.out.println(names);
        names.add("fifa");
        System.out.println(names);
        names.addLast("querty");
        System.out.println(names);


    }
}
