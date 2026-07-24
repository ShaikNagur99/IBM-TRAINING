class Employee1 {
    void details() {
        int id = 200;
        System.out.println("Employee ID: " + id);
    }
}

class Manager1 extends Employee1 {
    void login() {
        String name = "Shaik";
        System.out.println("Manager Name: " + name);
    }
}

class TeamLeader extends Manager1 {
    void department() {
        System.out.println("Department: IT");
    }

    public static void main(String[] args) {
        TeamLeader t = new TeamLeader();

        t.details();      // From Employee1
        t.login();        // From Manager1
        t.department();   // From TeamLeader
    }
}