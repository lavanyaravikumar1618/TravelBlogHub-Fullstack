package com.example.springapp.controller;

import com.example.springapp.model.Like;
import com.example.springapp.service.LikeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/likes")
public class LikeController {
    @Autowired private LikeService likeService;

    @GetMapping("/post/{postId}/count")
    public ResponseEntity<Long> count(@PathVariable Long postId) {
        long count = likeService.countLikes(postId);
        return ResponseEntity.ok(count);
    }

    @GetMapping("/post/{postId}/by/{userId}")
    public ResponseEntity<Boolean> isLiked(@PathVariable Long postId, @PathVariable Long userId) {
        boolean liked = likeService.isLikedByUser(userId, postId);
        return ResponseEntity.ok(liked);
    }

    @PostMapping
    public ResponseEntity<Like> like(@RequestParam Long userId, @RequestParam Long postId) {
        Like l = likeService.like(userId, postId);
        return ResponseEntity.status(HttpStatus.CREATED).body(l);
    }

    @DeleteMapping
    public ResponseEntity<Void> unlike(@RequestParam Long userId, @RequestParam Long postId) {
        likeService.unlike(userId, postId);
        return ResponseEntity.noContent().build();
    }
}
