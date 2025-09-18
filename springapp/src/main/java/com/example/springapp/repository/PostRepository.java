package com.example.springapp.repository;

import com.example.springapp.model.Post;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface PostRepository extends JpaRepository<Post, Long> {

    // simple published paging
    Page<Post> findByPublishedTrue(Pageable pageable);

    /**
     * Search published posts by title, excerpt, slug, author username, category name, or tag name.
     * Uses LEFT JOINs so posts without categories/tags are still found.
     * Avoids searching LOB content with lower() to prevent CLOB argument errors.
     */
    @Query("""
        select distinct p
        from Post p
        left join p.author a
        left join p.categories c
        left join p.tags t
        where p.published = true
          and (
            lower(p.title) like lower(concat('%', :q, '%'))
            or (p.excerpt is not null and lower(p.excerpt) like lower(concat('%', :q, '%')))
            or lower(p.slug) like lower(concat('%', :q, '%'))
            or lower(a.username) like lower(concat('%', :q, '%'))
            or lower(c.name) like lower(concat('%', :q, '%'))
            or lower(t.name) like lower(concat('%', :q, '%'))
          )
    """)
    Page<Post> searchPublished(@Param("q") String q, Pageable pageable);

    java.util.Optional<Post> findBySlug(String slug);
}
