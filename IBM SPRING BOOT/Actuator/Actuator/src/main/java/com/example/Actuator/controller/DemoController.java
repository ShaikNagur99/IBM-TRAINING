package com.example.Actuator.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
@RestController
public class DemoController {
        @GetMapping("/")
        public String home() {
            return "Welcome to Spring Boot Actuator Demo";
        }
}
