package com.alexanderbelldev.trelloclone.Service;

import com.alexanderbelldev.trelloclone.Model.User;

import java.util.List;

public interface UserService {
    boolean saveUser(User user);

    List<String> checkEmailExists(String email);
    List<String> checkUsernameExists(String username);
    boolean checkLogin(String username, String password);
}
