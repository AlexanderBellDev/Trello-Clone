package com.alexanderbelldev.trelloclone.Service.Impl;

import com.alexanderbelldev.trelloclone.Model.User;
import com.alexanderbelldev.trelloclone.Repository.UserRepository;
import com.alexanderbelldev.trelloclone.Service.UserService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {
    private UserRepository userRepository;

    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public boolean saveUser(User user) {

userRepository.save(user);
        return true;
    }

    public List<User> checkEmailExists(String email) {
        System.out.println(userRepository.findAllByEmail(email));
     return userRepository.findAllByEmail(email);
    }

    public List<User> checkUsernameExists(String username) {
        System.out.println(userRepository.findAllByUsername(username));
        return userRepository.findAllByUsername(username);
    }
}

