class Ceck {
    int x = 10;
    static int y = 20;
}

public class Shaik {
    public static void main(String args[]) {

        Ceck s = new Ceck();
        Ceck s1 = new Ceck();

        s.x = 120;
        s1.y = 100;     // Changes static variable

        System.out.println("s.x = " + s.x);
        System.out.println("s1.x = " + s1.x);

        System.out.println("s.y = " + s.y);
        System.out.println("s1.y = " + s1.y);
    }
}