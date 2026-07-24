public class Employee {
    int age=23;
    String name="Shaik";
}

class Manager extends Employee{
    public static void main (String args[]) {


        Manager m = new Manager();

        System.out.println("Age = " + m.age);
        System.out.println("Name = " + m.name);
    }
}
