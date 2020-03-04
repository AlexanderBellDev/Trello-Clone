package com.alexanderbelldev.trelloclone.Repository;

import com.alexanderbelldev.trelloclone.Model.Board;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BoardRepository extends JpaRepository<Board, Integer> {

    Board findByUsername(String username);
}
