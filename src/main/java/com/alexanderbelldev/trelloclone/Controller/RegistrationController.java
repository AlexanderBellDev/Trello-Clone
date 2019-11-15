package com.alexanderbelldev.trelloclone.Controller;

import com.alexanderbelldev.trelloclone.Model.User;
import com.alexanderbelldev.trelloclone.Service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class RegistrationController {
    private UserService userService;

    public RegistrationController(UserService userService) {
        this.userService = userService;
    }

    @CrossOrigin("http://localhost:4200")
    @PostMapping("/api/register")
    public ResponseEntity<?> register(@RequestBody User user){
       if(userService.saveUser(user)){
           return new ResponseEntity<>(user, HttpStatus.OK);
       }else {
           return new ResponseEntity<>("emailexists", HttpStatus.CONFLICT);
       }
    }
    @GetMapping("/api/checkemail/{email}")
    @CrossOrigin("http://localhost:4200")
    public ResponseEntity<?> checkEmailExists(@PathVariable String email){
      return new ResponseEntity<>(userService.checkEmailExists(email), HttpStatus.OK);
    }

    @GetMapping("/api/checkusername/{username}")
    @CrossOrigin("http://localhost:4200")
    public ResponseEntity<?> checkUsernameExists(@PathVariable String username){
        return new ResponseEntity<>(userService.checkUsernameExists(username), HttpStatus.OK);
    }


}
