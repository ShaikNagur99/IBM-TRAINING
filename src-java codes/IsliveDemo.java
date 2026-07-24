class MyThread2 extends Thread {

    public void run() {
        System.out.println(getName() + " is running");
        try {
            Thread.sleep(2000);
        } catch (InterruptedException e) {
        }
        System.out.println(getName() + " is completed");
    }
}

public class IsliveDemo {
    public static void main(String[] args) {

        MyThread t1 = new MyThread();
        t1.setName("Morning");

        System.out.println("Before start(): " + t1.isAlive());

        t1.start();

        System.out.println("After start(): " + t1.isAlive());

        try {
            t1.join();   // Wait until the thread finishes
        } catch (InterruptedException e) {
        }

        System.out.println("After completion: " + t1.isAlive());
    }
}
