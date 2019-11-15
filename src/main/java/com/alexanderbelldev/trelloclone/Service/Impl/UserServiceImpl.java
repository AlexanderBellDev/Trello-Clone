package com.alexanderbelldev.trelloclone.Service.Impl;

import com.alexanderbelldev.trelloclone.Model.User;
import com.alexanderbelldev.trelloclone.Repository.UserRepository;
import com.alexanderbelldev.trelloclone.Service.UserService;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {
    private UserRepository userRepository;

    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public boolean saveUser(User user) {

        if (userRepository.findAllByEmail(user.getEmail()).isEmpty()) {
            userRepository.save(user);
            System.out.println();
            return true;
        }
        return false;
    }
    }

