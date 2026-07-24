class MyThread1 extends Thread {
    int time;

    MyThread1(String name, int time) {
        setName(name);
        this.time = time;
    }

    public void run() {
        try {
            Thread.sleep(time);
        } catch (InterruptedException e) {
        }

        System.out.println(getName() + " Priority: " + getPriority());

        Thread.dumpStack();

        for (int i = 1; i <= 20; i++) {
            System.out.println(getName() + " : " + i);
        }
    }
}

public class Thread2 {
    public static void main(String[] args) {

        MyThread1 t1 = new MyThread1("Morning", 2000);
        MyThread1 t2 = new MyThread1("Afternoon", 1000);
        MyThread1 t3 = new MyThread1("Evening", 0);

        t1.setPriority(Thread.MAX_PRIORITY);
        t2.setPriority(Thread.NORM_PRIORITY);
        t3.setPriority(Thread.MIN_PRIORITY);

        t1.start();
        t2.start();
        t3.start();
    }
}