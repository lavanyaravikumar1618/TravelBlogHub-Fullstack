package com.example.springapp.service;

import com.example.springapp.model.Role;
import com.example.springapp.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
public class RoleService {

    @Autowired
    private RoleRepository roleRepository;

    public Page<Role> findAll(int page, int size, Sort sort) {
        Pageable pageable = PageRequest.of(page, size, sort);
        return roleRepository.findAll(pageable);
    }

    public Optional<Role> findById(Long id) {
        return roleRepository.findById(id);
    }

    public Optional<Role> findByName(String name) {
        return roleRepository.findByName(name);
    }

    @Transactional
    public Role create(Role role) {
        // simple uniqueness check
        if (role.getName() != null && roleRepository.findByName(role.getName()).isPresent()) {
            throw new IllegalArgumentException("Role with this name already exists: " + role.getName());
        }
        return roleRepository.save(role);
    }

    @Transactional
    public Role update(Long id, Role update) {
        Role existing = roleRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Role not found: " + id));

        if (update.getName() != null && !update.getName().equals(existing.getName())) {
            // check uniqueness
            roleRepository.findByName(update.getName()).ifPresent(r -> {
                if (!r.getId().equals(id)) {
                    throw new IllegalArgumentException("Another role with this name exists: " + update.getName());
                }
            });
            existing.setName(update.getName());
        }
        return roleRepository.save(existing);
    }

    @Transactional
    public void delete(Long id) {
        roleRepository.deleteById(id);
    }
}
