package com.alexanderbelldev.trelloclone.Controller;

import com.alexanderbelldev.trelloclone.Exception.AppException;
import com.alexanderbelldev.trelloclone.Model.Role;
import com.alexanderbelldev.trelloclone.Model.RoleName;
import com.alexanderbelldev.trelloclone.Model.User;
import com.alexanderbelldev.trelloclone.Payload.ApiResponse;
import com.alexanderbelldev.trelloclone.Payload.JwtAuthenticationResponse;
import com.alexanderbelldev.trelloclone.Repository.RoleRepository;
import com.alexanderbelldev.trelloclone.Repository.UserRepository;
import com.alexanderbelldev.trelloclone.Security.JwtTokenProvider;
import com.alexanderbelldev.trelloclone.Service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;
import java.net.URI;
import java.util.Collections;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private UserService userService;
    private UserRepository userRepository;
    private PasswordEncoder passwordEncoder;
    private RoleRepository roleRepository;
    private AuthenticationManager authenticationManager;
    private JwtTokenProvider tokenProvider;

    public AuthController(UserService userService, UserRepository userRepository, PasswordEncoder passwordEncoder, RoleRepository roleRepository,
                          AuthenticationManager authenticationManager, JwtTokenProvider tokenProvider) {
        this.userService = userService;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.roleRepository = roleRepository;
        this.authenticationManager = authenticationManager;
        this.tokenProvider = tokenProvider;
    }


    //    @CrossOrigin("http://localhost:4200")
//    @PostMapping("/api/register")
//    public ResponseEntity<?> register(@RequestBody User user){
//       if(userService.saveUser(user)){
//           return new ResponseEntity<>(user, HttpStatus.OK);
//       }else {
//           return new ResponseEntity<>("emailexists", HttpStatus.CONFLICT);
//       }
//    }


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


    @CrossOrigin("http://localhost:4200")
    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@Valid @RequestBody User user) {
        if(userRepository.existsByUsername(user.getUsername())) {
            return new ResponseEntity<>(new ApiResponse(false, "Username is already taken!"),
                    HttpStatus.BAD_REQUEST);
        }

        if(userRepository.existsByEmail(user.getEmail())) {
            return new ResponseEntity<>(new ApiResponse(false, "Email Address already in use!"),
                    HttpStatus.BAD_REQUEST);
        }


        user.setPassword(passwordEncoder.encode(user.getPassword()));

        Role userRole = roleRepository.findByName(RoleName.ROLE_USER)
                .orElseThrow(() -> new AppException("User Role not set."));

        user.setRoles(Collections.singleton(userRole));

        User result = userRepository.save(user);

        URI location = ServletUriComponentsBuilder
                .fromPath("/api/users/{username}")
                .buildAndExpand(result.getUsername()).toUri();

        return ResponseEntity.created(location).body(new ApiResponse(true, "User registered successfully"));
    }


//    @PostMapping("/api/checklogin")
//    @CrossOrigin("http://localhost:4200")
//    public ResponseEntity<?> checkLogin(@RequestBody User user){
//        boolean result = userService.checkLogin(user.getUsername(), user.getPassword());
//
//        if(!result){
//            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
//        }
//        return new ResponseEntity<>(HttpStatus.OK);
//    }

    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody User loginRequest) {

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getUsername(),
                        loginRequest.getPassword()
                )
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);

        String jwt = tokenProvider.generateToken(authentication);
        return ResponseEntity.ok(new JwtAuthenticationResponse(jwt));
    }


}

