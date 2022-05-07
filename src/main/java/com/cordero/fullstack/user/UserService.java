package com.cordero.fullstack.user;

import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@AllArgsConstructor
@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public List<User> getUsersByType (UserType type) {
        return userRepository.getUserByUserType(type);
    }

    public User createUser(User user) {
        var u =userRepository.findUserByEmail(user.getEmail()).isPresent();
        if (userRepository.findUserByEmail(user.getEmail()).isPresent()) {
            throw new IllegalStateException(String.format("A user already exist with this email [%s]", user.getEmail()));
        }
        return userRepository.save(user);
    }

    public void deleteUser(Long userId) {
        if (userRepository.existsById(userId)) {
            throw new IllegalStateException(String.format("User not found with Id [%s]", userId));
        }
        userRepository.deleteById(userId);
    }
}
