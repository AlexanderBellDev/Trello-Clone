package com.alexanderbelldev.trelloclone.Service.Impl;

import com.alexanderbelldev.trelloclone.Model.User;
import com.alexanderbelldev.trelloclone.Repository.UserRepository;
import com.alexanderbelldev.trelloclone.Service.UserService;
import org.springframework.stereotype.Service;

import java.util.Collections;
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

    public List<String> checkEmailExists(String email) {
        if(userRepository.findAllByEmail(email).isEmpty()){
            return Collections.emptyList();
        }else{
            return Collections.singletonList("exists");
        }
    }

    public List<String> checkUsernameExists(String username) {
        System.out.println(userRepository.findAllByUsername(username));
        if(userRepository.findAllByUsername(username).isEmpty()){
            return Collections.emptyList();
        }else{
            return Collections.singletonList("exists");
        }
    }

    public boolean checkLogin(String username, String password) {
        return userRepository.findByUsernameAndPassword(username, password) != null;
    }
}

