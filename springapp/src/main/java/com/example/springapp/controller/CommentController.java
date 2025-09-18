package com.example.springapp.controller;

import com.example.springapp.model.Comment;
import com.example.springapp.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.*;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/comments")
public class CommentController {
    @Autowired private CommentService commentService;

    @GetMapping("/post/{postId}")
    public ResponseEntity<Page<Comment>> listByPost(
            @PathVariable Long postId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {

        Page<Comment> comments = commentService.listByPost(postId, page, size);
        return ResponseEntity.ok(comments);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Comment> getById(@PathVariable Long id) {
        Optional<Comment> c = commentService.findById(id);
        return c.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/post/{postId}")
    public ResponseEntity<Comment> create(@PathVariable Long postId, @RequestBody Comment comment) {
        Comment created = commentService.create(postId, comment);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @PutMapping("/{id}/approve")
    public ResponseEntity<Comment> approve(@PathVariable Long id, @RequestParam(defaultValue = "true") boolean approved) {
        Comment updated = commentService.approve(id, approved);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        commentService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
