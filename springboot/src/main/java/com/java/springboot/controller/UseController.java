package com.java.springboot.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.java.springboot.model.User;
import com.java.springboot.repository.UserRepository;

@RestController
@RequestMapping("user")
public class UseController {

  @Autowired
  private UserRepository userRepository;

  @GetMapping("{id}")
  public User user(@PathVariable("id") Long id) {

    Optional<User> userFind = this.userRepository.findById(id);

    if (userFind.isPresent()) {
      return userFind.get();
    }

    return null;
  }

  @PostMapping
  public User user(@RequestBody User user) {
    return this.userRepository.save(user);
  }

  @GetMapping("list")
  public List<User> allUsers() {
    return this.userRepository.findAll();
  }
}
