package com.example.springapp.repository;

import com.example.springapp.model.Like;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface LikeRepository extends JpaRepository<Like, Long> {
    long countByPostId(Long postId);
    Optional<Like> findByUserIdAndPostId(Long userId, Long postId);
}
