package com.cordero.fullstack.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public List<User> getUsersByType (UserType type) {
        return userRepository.getUserByUserType(type);
    }

    public User createUser(User user) {
        return userRepository.save(user);
    }
}
