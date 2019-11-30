package com.alexanderbelldev.trelloclone.Controller;

import com.alexanderbelldev.trelloclone.Model.User;
import com.alexanderbelldev.trelloclone.Service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class LoginController {
    private UserService userService;

    public LoginController(UserService userService) {
        this.userService = userService;
    }

}
