public class DemoMethodOverriding {

    public void details(int age, String name) {
        System.out.println(age);
        System.out.println(name);
    }

    public void contact(String address, int roadno) {
        System.out.println(address);
        System.out.println(roadno);

    }
}

class Child extends DemoMethodOverriding {

    @Override
    public void details(int age, String name) {
        System.out.println("Age: " + age);
        System.out.println("Name: " + name);
    }

    public static void main(String[] args) {

        Child q = new Child();

        q.details(22, "Nagur");
        q.contact("Bangalore", 10);
    }
}