package com.example.customer.entity;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
@Entity
public class Customer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String accounttype;


    // Default Constructor
    public Customer() {
    }

    // Parameterized Constructor
    public Customer(String accounttype) {
        this.accounttype = accounttype;

    }

    // Getters and Setters
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getAccounttype() {
        return accounttype;
    }

    public void SetAccounttype(String accounttype) {
        this.accounttype = accounttype;
    }


}
