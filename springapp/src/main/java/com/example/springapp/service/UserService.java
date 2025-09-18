package com.example.springapp.service;

import com.example.springapp.model.User;
import com.example.springapp.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
public class UserService {
    @Autowired private UserRepository userRepository;

    public Page<User> listAll(int page, int size, Sort sort) {
        Pageable pageable = PageRequest.of(page, size, sort);
        return userRepository.findAll(pageable);
    }

    public Optional<User> findById(Long id) { return userRepository.findById(id); }

    public Optional<User> findByUsername(String username) { return userRepository.findByUsername(username); }

    @Transactional
    public User create(User user) {
        // validate existence should be done by caller; simple check here
        if (userRepository.existsByUsername(user.getUsername())) {
            throw new IllegalArgumentException("Username already exists");
        }
        if (userRepository.existsByEmail(user.getEmail())) {
            throw new IllegalArgumentException("Email already exists");
        }
        return userRepository.save(user);
    }

    @Transactional
    public User update(Long id, User update) {
        User existing = userRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found"));
        if (update.getUsername() != null) existing.setUsername(update.getUsername());
        if (update.getEmail() != null) existing.setEmail(update.getEmail());
        if (update.getPassword() != null) existing.setPassword(update.getPassword());
        existing.setEnabled(update.isEnabled());
        return userRepository.save(existing);
    }

    @Transactional
    public void delete(Long id) {
        userRepository.deleteById(id);
    }
}
