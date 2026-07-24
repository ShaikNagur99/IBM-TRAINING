class MyThread extends Thread {

    public void run() {
        System.out.println("Thread Name : " + getName());
        System.out.println("Priority    : " + getPriority());

        try {
            Thread.sleep(2000); // Sleep for 2 seconds
        } catch (InterruptedException e) {
            System.out.println(e);
        }

        System.out.println(getName() + " execution completed.");
    }
}

public class Thread1 {
    public static void main(String[] args) {

        MyThread t1 = new MyThread();
        MyThread t2 = new MyThread();
        MyThread t3 = new MyThread();

        // Set thread names
        t1.setName("Thread1");
        t2.setName("Thread2");
        t3.setName("Thread3");

        // Set priorities
        t1.setPriority(Thread.MAX_PRIORITY);   // 10
        t2.setPriority(Thread.NORM_PRIORITY);  // 5
        t3.setPriority(Thread.MIN_PRIORITY);   // 1

        // Start threads
        t1.start();
        t2.start();
        t3.start();

        //t1.getName();
       // t2.getName();
       // t3.getName();
       // System.out.println(t1.getName());
       // System.out.println(t2.getName());
      //  System.out.println(t3.getName());

    }
}