package com.emkn.backend.controller;

import com.emkn.backend.model.UserDTO;
import com.emkn.backend.repository.SQLUserRepository;
import com.emkn.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserRepository userRepository;

    @Autowired
    public UserController(SQLUserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @GetMapping
    public List<UserDTO> getAllUsers() {
        return userRepository.getAll();
    }

    @GetMapping("/{id}")
    public UserDTO getUserById(@PathVariable int id) {
        return userRepository.getByID(id);
    }

    @PostMapping
    public int addUser(@RequestBody UserDTO userDTO) {
        return userRepository.addUser(userDTO);
    }

    @DeleteMapping("/{id}")
    public boolean deleteUserById(@PathVariable int id) {
        return userRepository.deleteByID(id);
    }

    @PostMapping("/authenticate")
    public UserDTO authenticate(@RequestBody UserDTO userDTO) {
        return userRepository.authenticate(userDTO.getUsername(), userDTO.getPassword());
    }
}
