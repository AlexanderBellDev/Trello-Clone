package com.alexanderbelldev.trelloclone.Model;

import lombok.Data;

import javax.persistence.*;
import java.util.List;
import java.util.Set;

@Data
@Entity
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    Integer id;
    String username;
    String firstName;
    String surname;
    String email;
    String password;
    String address1;
    String address2;
    String city;
    String postalCode;

}
