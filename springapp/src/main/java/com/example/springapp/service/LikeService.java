package com.example.springapp.service;

import com.example.springapp.model.*;
import com.example.springapp.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class LikeService {
    @Autowired private LikeRepository likeRepository;
    @Autowired private UserRepository userRepository;
    @Autowired private PostRepository postRepository;

    public long countLikes(Long postId) { return likeRepository.countByPostId(postId); }

    public boolean isLikedByUser(Long userId, Long postId) {
        return likeRepository.findByUserIdAndPostId(userId, postId).isPresent();
    }

    @Transactional
    public Like like(Long userId, Long postId) {
        if (isLikedByUser(userId, postId)) {
            throw new IllegalStateException("Already liked");
        }
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        Post post = postRepository.findById(postId).orElseThrow(() -> new RuntimeException("Post not found"));
        Like l = new Like();
        l.setUser(user);
        l.setPost(post);
        return likeRepository.save(l);
    }

    @Transactional
    public void unlike(Long userId, Long postId) {
        likeRepository.findByUserIdAndPostId(userId, postId).ifPresent(likeRepository::delete);
    }
}
