public class EncapsulationDemo {
     int age;
     String name;

     public void setAge(int age){
         this.age=age;

     }
     public int  getAge(){
         return age;
     }
     public void setName(String name){
         this.name=name;
     }
     public String getName(){
         return name;
     }

    public static void main(String[] args) {
        EncapsulationDemo h=new EncapsulationDemo();
        h.setAge(23);
        h.setName("Shaik");
        System.out.println(h.getAge());
        System.out.println(h.getName());

    }


}
