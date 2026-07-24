public class TypeCasting {
    public static void main(String[] args) {
        int a=20;
        double d=a;   //implicit
        System.out.println("integer:" + a);
        System.out.println("double:" +d);


        double z=200.0;
        int  x=(int)z;//explicit
        System.out.println("double:" +z);
        System.out.println("integer:" + x);

    }
}
