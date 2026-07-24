class RunnableDemo implements Runnable {

    private Thread t;
    private String threadName;

    // Constructor
    RunnableDemo(String name) {
        threadName = name;
        System.out.println("Creating " + threadName);
    }

    // Thread execution
    public void run() {
        System.out.println("Running " + threadName);

        try {
            for (int i = 4; i > 0; i--) {
                System.out.println("Thread: " + threadName + ", " + i);

                // Pause the thread for 50 milliseconds
                Thread.sleep(50);
            }
        } catch (InterruptedException e) {
            System.out.println("Thread " + threadName + " interrupted.");
        }

        System.out.println("Thread " + threadName + " exiting.");
    }

    // Start the thread
    public void start() {
        System.out.println("Starting " + threadName);

        if (t == null) {
            t = new Thread(this, threadName);
            t.start();
        }
    }
}

public class TestThread {

    public static void main(String[] args) {

        RunnableDemo R1 = new RunnableDemo("Thread-1");
        R1.start();

        RunnableDemo R2 = new RunnableDemo("Thread-2");
        R2.start();
    }
}