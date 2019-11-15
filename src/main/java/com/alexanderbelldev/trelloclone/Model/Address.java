package com.alexanderbelldev.trelloclone.Model;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
class Address {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    Integer id;
    String address1;
    String address2;
    String city;
    String postalCode;
}
