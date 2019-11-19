package com.alexanderbelldev.trelloclone.Repository;

import com.alexanderbelldev.trelloclone.Model.Items;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ItemRepository extends JpaRepository<Items, Integer> {

    List<Items> findAllByUsernameOrderByIndexNumAsc(String username);
}
