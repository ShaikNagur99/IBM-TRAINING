package com.example.customer.controller;

import com.example.customer.entity.Customer;
import com.example.customer.repository.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
@RestController
public class CustomerController {

        @Autowired
        private CustomerRepository repository;

        @GetMapping("/add")
        public String addCustomer() {

            Customer cus = new Customer();
            cus.SetAccounttype("savings");


            repository.save(cus);

            return "customer Saved Successfully!";
        }
        @GetMapping("/customer")
        public List<Customer> getCustomer() {
            return repository.findAll();
        }



}
