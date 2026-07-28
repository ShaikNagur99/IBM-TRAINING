package com.example.Student.Controller;

import com.example.Student.entity.Student;
import com.example.Student.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class StudentController {

    @Autowired
    private StudentRepository repository;

    @GetMapping("/add")
    public String addStudent() {

        Student student = new Student();
        student.setName("Nagur");
        student.setCourse("Java");

        repository.save(student);

        return "Student Saved Successfully!";
    }
    @GetMapping("/students")
    public List<Student> getStudents() {
        return repository.findAll();
    }
}