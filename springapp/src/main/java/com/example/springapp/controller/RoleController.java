package com.example.springapp.controller;

import com.example.springapp.model.Role;
import com.example.springapp.service.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.*;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/roles")
public class RoleController {

    @Autowired
    private RoleService roleService;

    /**
     * List roles with pagination.
     * Example: GET /api/roles?page=0&size=20&sort=id,asc
     */
    @GetMapping
    public ResponseEntity<Page<Role>> list(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size,
            @RequestParam(defaultValue = "id,asc") String sort) {

        String[] sortParts = sort.split(",");
        Sort s = Sort.by(sortParts[0]);
        if (sortParts.length > 1 && "desc".equalsIgnoreCase(sortParts[1])) {
            s = s.descending();
        }
        Page<Role> roles = roleService.findAll(page, size, s);
        return ResponseEntity.ok(roles);
    }

    /**
     * Get role by id
     */
    @GetMapping("/{id}")
    public ResponseEntity<Role> getById(@PathVariable Long id) {
        Optional<Role> r = roleService.findById(id);
        return r.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    /**
     * Get role by name
     */
    @GetMapping("/by-name/{name}")
    public ResponseEntity<Role> getByName(@PathVariable String name) {
        Optional<Role> r = roleService.findByName(name);
        return r.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    /**
     * Create a new role
     */
    @PostMapping
    public ResponseEntity<Role> create(@RequestBody Role role) {
        Role created = roleService.create(role);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    /**
     * Update an existing role
     */
    @PutMapping("/{id}")
    public ResponseEntity<Role> update(@PathVariable Long id, @RequestBody Role role) {
        Role updated = roleService.update(id, role);
        return ResponseEntity.ok(updated);
    }

    /**
     * Delete role by id
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        roleService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
