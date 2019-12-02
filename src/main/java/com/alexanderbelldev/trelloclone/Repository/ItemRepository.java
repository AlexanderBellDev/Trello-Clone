package com.alexanderbelldev.trelloclone.Repository;

import com.alexanderbelldev.trelloclone.Model.Item;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ItemRepository extends JpaRepository<Item, Integer> {

    List<Item> findAllByUsernameOrderByIndexNumAsc(String username);
}
