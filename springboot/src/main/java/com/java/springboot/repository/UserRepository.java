package com.java.springboot.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.java.springboot.model.User;

public interface UserRepository extends JpaRepository<User, Long> {

}
