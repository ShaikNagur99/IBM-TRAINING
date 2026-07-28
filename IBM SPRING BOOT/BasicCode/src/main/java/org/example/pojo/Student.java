package org.example.pojo;

public class Student {

    private int id;
    private String name;
    private String course;

    public Student() {
        System.out.println("Student Object Created");
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void display() {
        System.out.println("Student ID : " + id);
        System.out.println("Student Name : " + name);

    }
}