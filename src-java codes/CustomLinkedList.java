class Node {
    int data;
    Node next;

    // Constructor
    Node(int data) {
        this.data = data;
        this.next = null;
    }
}

public class CustomLinkedList {

    Node head;

    // Method to add a node at the end
    public void add(int data) {
        Node newNode = new Node(data);

        if (head == null) {
            head = newNode;
            return;
        }

        Node temp = head;

        while (temp.next != null) {
            temp = temp.next;
        }

        temp.next = newNode;
    }

    // Method to display the linked list
    public void display() {
        Node temp = head;

        while (temp != null) {
            System.out.print(temp.data + " -> ");
            temp = temp.next;
        }

        System.out.println("NULL");
    }

    public static void main(String[] args) {

        CustomLinkedList list = new CustomLinkedList();

        // Add elements
        list.add(10);
        list.add(20);
        list.add(30);
        list.add(40);

        // Display linked list
        System.out.println("Linked List:");
        list.display();
    }
}