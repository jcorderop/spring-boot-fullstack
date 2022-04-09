package com.cordero.fullstack.user;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping(path = "/api/v1/users")
public class UserController {

    @GetMapping
    public ResponseEntity<List<User>> getUsersByType(@RequestParam() String type) {
        List<User> users;
        if (UserType.PRIVATE.name().equals(type)) {
            users = List.of(new User(1L, "Jorge", "jorge@gmail.com", UserType.PRIVATE),
                    new User(2L, "Pepe", "pepe@gmail.com", UserType.PRIVATE));
        } else if (UserType.CORPORATE.name().equals(type)) {
            users = List.of(new User(3L, "AG Corporate", "ag@corporate.com", UserType.CORPORATE));
        } else {
            users = new ArrayList<>();
        }
        return new ResponseEntity<>(users, HttpStatus.OK);
    }

}
