package com.cordero.fullstack.user;

import com.cordero.fullstack.api.ApiResponse;
import com.cordero.fullstack.api.BaseResponse;
import com.cordero.fullstack.user.response.UserResponse;
import com.cordero.fullstack.user.response.UsersResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.text.MessageFormat;

@Slf4j
@RestController
@RequestMapping(path = "/api/v1/users")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping
    public ResponseEntity<ApiResponse> getUsersByType(@RequestParam() UserType type) {
        try {
            //throw new IllegalArgumentException("Invalid request");
            return new ResponseEntity<>(new UsersResponse(userService.getUsersByType(type)), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(new BaseResponse(MessageFormat.format("Data could not be retrieved - {0}", e.getMessage())), HttpStatus.BAD_REQUEST);
        }

    }

    @PostMapping
    public ResponseEntity<ApiResponse> addStudent(@Valid @RequestBody User user) {
        try {
            return new ResponseEntity<>(new UserResponse(userService.createUser(user)), HttpStatus.CREATED);
        } catch (Exception e) {
            log.error(e.getMessage());
            return new ResponseEntity<>(new BaseResponse(MessageFormat.format("User could not be created. {0}", e.getMessage())), HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping(path = "{userId}")
    public ResponseEntity<ApiResponse> deleteStudent(@PathVariable("userId") Long userId) {
        try {
            userService.deleteUser(userId);
            return new ResponseEntity<>(new BaseResponse("User deleted") ,HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(new BaseResponse(MessageFormat.format("User could not be deleted - {0}", e.getMessage())), HttpStatus.NOT_FOUND);
        }
    }


}
