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
    @PostMapping("/api/checklogin")
    @CrossOrigin("http://localhost:4200")
    public ResponseEntity<?> checkLogin(@RequestBody User user){
        boolean result = userService.checkLogin(user.getUsername(), user.getPassword());

        if(!result){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
