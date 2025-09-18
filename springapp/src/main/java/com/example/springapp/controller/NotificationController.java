package com.example.springapp.controller;

import com.example.springapp.model.Notification;
import com.example.springapp.service.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.*;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/notifications")
public class NotificationController {
    @Autowired private NotificationService notificationService;

    @GetMapping("/user/{userId}")
    public ResponseEntity<Page<Notification>> listForUser(
            @PathVariable Long userId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {

        Page<Notification> p = notificationService.listForUser(userId, page, size);
        return ResponseEntity.ok(p);
    }

    @PostMapping("/user/{userId}")
    public ResponseEntity<Notification> createForUser(@PathVariable Long userId, @RequestBody Notification notification) {
        Notification created = notificationService.createForUser(userId, notification.getMessage());
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @PutMapping("/{id}/read")
    public ResponseEntity<Notification> markRead(@PathVariable Long id) {
        Notification updated = notificationService.markRead(id);
        return ResponseEntity.ok(updated);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Notification> getById(@PathVariable Long id) {
        Optional<Notification> n = notificationService.findById(id);
        return n.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        notificationService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
