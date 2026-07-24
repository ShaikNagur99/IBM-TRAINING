import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;


public class StreamApI {
    public static void main(String[] args) {
        List<String> list = new ArrayList<>();
        list.add("Shaik");
        list.add("Rama");
        list.add("Seeta");

        List<String> filtered = list.stream()
                .filter(name -> name.startsWith("S"))
                .collect(Collectors.toList());
        System.out.println(filtered);
    }
}
