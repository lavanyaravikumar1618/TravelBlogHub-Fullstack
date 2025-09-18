package com.example.springapp.service;

import com.example.springapp.model.Tag;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

public interface TagService {
    Page<Tag> findAll(int page, int size);
    Page<Tag> findAll(Pageable pageable);
    Optional<Tag> findById(Long id);
    Tag create(Tag tag);
    Tag update(Long id, Tag tag);
    void delete(Long id);
    Optional<Tag> findByName(String name);
}
