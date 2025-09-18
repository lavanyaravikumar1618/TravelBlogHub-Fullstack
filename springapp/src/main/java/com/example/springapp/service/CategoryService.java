package com.example.springapp.service;

import com.example.springapp.model.Category;
import com.example.springapp.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
public class CategoryService {
    @Autowired private CategoryRepository categoryRepository;

    public Page<Category> listAll(int page, int size, Sort sort) {
        Pageable pageable = PageRequest.of(page, size, sort);
        return categoryRepository.findAll(pageable);
    }

    public Optional<Category> findById(Long id) { return categoryRepository.findById(id); }

    public Optional<Category> findBySlug(String slug) { return categoryRepository.findBySlug(slug); }

    @Transactional
    public Category create(Category c) {
        if (categoryRepository.findByName(c.getName()).isPresent()) {
            throw new IllegalArgumentException("Category with this name already exists");
        }
        return categoryRepository.save(c);
    }

    @Transactional
    public Category update(Long id, Category c) {
        Category existing = categoryRepository.findById(id).orElseThrow(() -> new RuntimeException("Category not found"));
        if (c.getName() != null) existing.setName(c.getName());
        if (c.getSlug() != null) existing.setSlug(c.getSlug());
        return categoryRepository.save(existing);
    }

    @Transactional
    public void delete(Long id) { categoryRepository.deleteById(id); }
}
