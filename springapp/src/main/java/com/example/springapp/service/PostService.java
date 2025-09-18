package com.example.springapp.service;

import com.example.springapp.model.*;
import com.example.springapp.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class PostService {
    @Autowired private PostRepository postRepository;
    @Autowired private UserRepository userRepository;
    @Autowired private CategoryRepository categoryRepository;

    public Page<Post> listPublished(int page, int size, Sort sort) {
        Pageable pageable = PageRequest.of(page, size, sort);
        return postRepository.findByPublishedTrue(pageable);
    }

    public Page<Post> searchPublished(String q, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return postRepository.searchPublished(q, pageable);
    }

    public Optional<Post> findById(Long id) { return postRepository.findById(id); }

    public Optional<Post> findBySlug(String slug) { return postRepository.findBySlug(slug); }

    @Transactional
    public Post create(Post post, String authorUsername) {
        if (post.getSlug() == null || post.getSlug().isBlank()) {
            // simple slug generation
            post.setSlug(post.getTitle().toLowerCase().replaceAll("\\s+","-"));
        }
        User author = userRepository.findByUsername(authorUsername)
                .orElseThrow(() -> new RuntimeException("Author not found"));
        post.setAuthor(author);
        post.setCreatedAt(LocalDateTime.now());
        // attach categories if provided (ids in category objects)
        if (post.getCategories() != null && !post.getCategories().isEmpty()) {
            Set<Category> cats = post.getCategories().stream()
                    .map(c -> categoryRepository.findById(c.getId())
                            .orElseThrow(() -> new RuntimeException("Category not found: " + c.getId())))
                    .collect(Collectors.toSet());
            post.setCategories(cats);
        }
        return postRepository.save(post);
    }

    @Transactional
    public Post update(Long id, Post updated) {
        Post p = postRepository.findById(id).orElseThrow(() -> new RuntimeException("Post not found"));
        if (updated.getTitle() != null) p.setTitle(updated.getTitle());
        if (updated.getContent() != null) p.setContent(updated.getContent());
        if (updated.getSlug() != null) p.setSlug(updated.getSlug());
        p.setPublished(updated.isPublished());
        p.setUpdatedAt(LocalDateTime.now());
        if (updated.getCategories() != null) {
            Set<Category> cats = updated.getCategories().stream()
                    .map(c -> categoryRepository.findById(c.getId())
                            .orElseThrow(() -> new RuntimeException("Category not found: " + c.getId())))
                    .collect(Collectors.toSet());
            p.setCategories(cats);
        }
        return postRepository.save(p);
    }

    @Transactional
    public void delete(Long id) { postRepository.deleteById(id); }
}
