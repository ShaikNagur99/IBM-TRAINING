class Encapsulation {
    public int a = 10;
    private int q = 78;
    protected int p = 50;

    public int getQ() {
        return q;
    }
}

class Member extends Encapsulation {

    public static void main(String[] args) {

        Member obj = new Member();

        System.out.println("Public a = " + obj.a);          // Accessible
        System.out.println("Protected p = " + obj.p);       // Accessible (inheritance)
        System.out.println("Private q = " + obj.getQ());    // Accessible through getter
    }
}