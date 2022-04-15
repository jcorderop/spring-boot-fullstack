package com.cordero.fullstack.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/api/v1/users")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping
    public ResponseEntity<List<User>> getUsersByType(@RequestParam() UserType type) {
        return new ResponseEntity<>(userService.getUsersByType(type), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<User> addStudent(@RequestBody User user) {
        return new ResponseEntity<>(userService.createUser(user), HttpStatus.CREATED);
    }

}
