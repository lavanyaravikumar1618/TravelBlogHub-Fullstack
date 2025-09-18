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
public class CommentService {
    @Autowired private CommentRepository commentRepository;
    @Autowired private PostRepository postRepository;

    public Page<Comment> listByPost(Long postId, int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("createdAt").descending());
        return commentRepository.findByPostIdAndApprovedTrue(postId, pageable);
    }

    public Optional<Comment> findById(Long id) { return commentRepository.findById(id); }

    @Transactional
    public Comment create(Long postId, Comment comment) {
        Post post = postRepository.findById(postId).orElseThrow(() -> new RuntimeException("Post not found"));
        comment.setPost(post);
        comment.setCreatedAt(LocalDateTime.now());
        comment.setApproved(false); // default moderation
        return commentRepository.save(comment);
    }

    @Transactional
    public Comment approve(Long id, boolean approved) {
        Comment c = commentRepository.findById(id).orElseThrow(() -> new RuntimeException("Comment not found"));
        c.setApproved(approved);
        return commentRepository.save(c);
    }

    @Transactional
    public void delete(Long id) { commentRepository.deleteById(id); }
}
