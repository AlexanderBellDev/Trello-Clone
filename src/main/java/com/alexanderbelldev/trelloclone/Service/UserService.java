package com.alexanderbelldev.trelloclone.Service;

import com.alexanderbelldev.trelloclone.Model.User;

import java.util.List;

public interface UserService {
    boolean saveUser(User user);

    List<User> checkEmailExists(String email);
    List<User> checkUsernameExists(String username);
}
