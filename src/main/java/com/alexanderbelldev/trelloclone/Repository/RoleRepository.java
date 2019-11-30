package com.alexanderbelldev.trelloclone.Repository;

import com.alexanderbelldev.trelloclone.Model.Role;
import com.alexanderbelldev.trelloclone.Model.RoleName;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
    Optional<Role> findByName(RoleName roleName);
}
