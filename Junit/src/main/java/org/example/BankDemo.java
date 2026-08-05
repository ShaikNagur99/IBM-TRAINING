package org.example;

public class BankDemo {
    private String  accountnumber;
    private double balance;

    BankDemo(String accountnumber,double balance){
        this.accountnumber=accountnumber;
        this.balance=balance;


    }
    public void withdraw(double amount){
        if(amount>balance) {
            throw new IllegalArgumentException("Insufficient balance");

        }
        balance =amount-balance;


    }


}

