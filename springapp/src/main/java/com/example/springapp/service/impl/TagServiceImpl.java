package com.example.springapp.service.impl;

import com.example.springapp.model.Tag;
import com.example.springapp.repository.TagRepository;
import com.example.springapp.service.TagService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional
public class TagServiceImpl implements TagService {

    private final TagRepository tagRepository;

    @Autowired
    public TagServiceImpl(TagRepository tagRepository) {
        this.tagRepository = tagRepository;
    }

    @Override
    public Page<Tag> findAll(int page, int size) {
        return tagRepository.findAll(PageRequest.of(page, size, Sort.by("name").ascending()));
    }

    @Override
    public Page<Tag> findAll(Pageable pageable) {
        return tagRepository.findAll(pageable);
    }

    @Override
    public Optional<Tag> findById(Long id) {
        return tagRepository.findById(id);
    }

    @Override
    public Tag create(Tag tag) {
        // optionally check for duplicate name
        tagRepository.findByNameIgnoreCase(tag.getName()).ifPresent(existing -> {
            throw new IllegalArgumentException("Tag already exists: " + tag.getName());
        });
        return tagRepository.save(tag);
    }

    @Override
    public Tag update(Long id, Tag tag) {
        Tag existing = tagRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Tag not found: " + id));
        existing.setName(tag.getName());
        return tagRepository.save(existing);
    }

    @Override
    public void delete(Long id) {
        tagRepository.deleteById(id);
    }

    @Override
    public Optional<Tag> findByName(String name) {
        return tagRepository.findByNameIgnoreCase(name);
    }
}
