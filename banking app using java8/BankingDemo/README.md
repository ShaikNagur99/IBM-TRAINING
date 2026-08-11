# Mini Banking App (Java 8)

This project is a simple console-based banking demo implemented using Java 8 features such as:

- Classes and objects
- Interfaces and default methods
- Lambda expressions
- Streams and collectors
- LocalDateTime for transaction timestamps

## Project Structure

```text
BankingDemo/
├── src/
│   └── com/bank/demo/
│       ├── Customer.java
│       ├── Transaction.java
│       ├── Payment.java
│       ├── CreditCardPayment.java
│       └── BankingApp.java
└── README.md
```

## Run the App

From the project root, compile and run:

```bash
javac -d out $(find src -name "*.java")
java -cp out com.bank.demo.BankingApp
```

## Features

- Create customers with balances
- Deposit and withdraw money
- Record transaction history
- Process payments using an interface
- Show recent transactions and grouped summaries
