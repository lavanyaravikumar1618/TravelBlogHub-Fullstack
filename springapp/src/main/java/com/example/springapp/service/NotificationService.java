package com.example.springapp.service;

import com.example.springapp.model.*;
import com.example.springapp.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class NotificationService {
    @Autowired private NotificationRepository notificationRepository;
    @Autowired private UserRepository userRepository;

    public Page<Notification> listForUser(Long userId, int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("createdAt").descending());
        return notificationRepository.findByRecipientId(userId, pageable);
    }

    @Transactional
    public Notification createForUser(Long userId, String message) {
        User u = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        Notification n = new Notification();
        n.setRecipient(u);
        n.setMessage(message);
        n.setCreatedAt(LocalDateTime.now());
        n.setReadFlag(false);
        return notificationRepository.save(n);
    }

    @Transactional
    public Notification markRead(Long id) {
        Notification n = notificationRepository.findById(id).orElseThrow(() -> new RuntimeException("Notification not found"));
        n.setReadFlag(true);
        return notificationRepository.save(n);
    }

    public Optional<Notification> findById(Long id) { return notificationRepository.findById(id); }

    @Transactional
    public void delete(Long id) { notificationRepository.deleteById(id); }
}
