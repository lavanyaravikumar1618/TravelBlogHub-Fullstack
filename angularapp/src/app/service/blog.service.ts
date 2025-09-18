// src/app/services/blog.service.ts
import { Injectable } from '@angular/core';

export interface Blog {
  id: string;
  title: string;
  excerpt: string;
  content?: string;
  image: string;
  author?: string;
  date?: string;
}

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private blogs: Blog[] = [
    {
      id: 'b-1690000000000',
      title: 'Backpacking Across Europe',
      excerpt: 'Tips to enjoy Europe on a budget, exploring famous landmarks and hidden gems.',
      content: 'Full article content for Backpacking Across Europe... (replace with real content)',
      image: 'assets/images/europe.jpg',
      author: 'Admin',
      date: '2025-09-01'
    },
    {
      id: 'b-1690000000001',
      title: 'Exploring the Himalayas',
      excerpt: 'A breathtaking trek through snow-capped peaks and local mountain culture.',
      content: 'Full article content for Exploring the Himalayas... (replace with real content)',
      image: 'assets/images/himalayas.jpg',
      author: 'Admin',
      date: '2025-08-20'
    }
  ];

  getBlogs(): Blog[] {
    return this.blogs;
  }

  getBlogById(id: string): Blog | undefined {
    return this.blogs.find(b => b.id === id);
  }

  addBlog(data: { title: string; excerpt: string; content?: string; image?: string; author?: string; date?: string; }) {
    const newBlog: Blog = {
      id: 'b-' + Date.now().toString(),
      title: data.title,
      excerpt: data.excerpt,
      content: data.content || data.excerpt,
      image: data.image || 'assets/images/default.jpg',
      author: data.author || 'You',
      date: data.date || new Date().toISOString().slice(0,10)
    };
    this.blogs.unshift(newBlog);
    return newBlog;
  }
}
