package com.alexanderbelldev.trelloclone.Model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Item {


    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    Integer id;
    String username;
    String itemName;
    String itemColor;
    String columnName;
    String itemDetail;
    Integer indexNum;
}
