import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Post } from '../model/post.model';
import { Comment } from '../model/comment.model';
import { Like } from '../model/like.model';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private postsSubject = new BehaviorSubject<Post[]>([]);
  public posts$ = this.postsSubject.asObservable();

  constructor() {
    this.loadMockPosts();
  }

  getPosts(): Observable<Post[]> {
    return this.posts$;
  }

  getPostById(id: string): Observable<Post | undefined> {
    return new Observable(observer => {
      const post = this.postsSubject.value.find(p => p.id === id);
      observer.next(post);
      observer.complete();
    });
  }

  createPost(post: Omit<Post, 'id' | 'createdAt' | 'updatedAt'>): Observable<Post> {
    return new Observable(observer => {
      const newPost: Post = {
        ...post,
        id: this.generateId(),
        createdAt: new Date(),
        updatedAt: new Date()
      };

      const posts = [newPost, ...this.postsSubject.value];
      this.postsSubject.next(posts);
      
      observer.next(newPost);
      observer.complete();
    });
  }

  updatePost(id: string, updates: Partial<Post>): Observable<Post | null> {
    return new Observable(observer => {
      const posts = this.postsSubject.value;
      const index = posts.findIndex(p => p.id === id);
      
      if (index !== -1) {
        posts[index] = { ...posts[index], ...updates, updatedAt: new Date() };
        this.postsSubject.next([...posts]);
        observer.next(posts[index]);
      } else {
        observer.next(null);
      }
      
      observer.complete();
    });
  }

  deletePost(id: string): Observable<boolean> {
    return new Observable(observer => {
      const posts = this.postsSubject.value.filter(p => p.id !== id);
      this.postsSubject.next(posts);
      observer.next(true);
      observer.complete();
    });
  }

  addComment(postId: string, comment: Omit<Comment, 'id' | 'createdAt'>): Observable<Comment> {
    return new Observable(observer => {
      const newComment: Comment = {
        ...comment,
        id: this.generateId(),
        createdAt: new Date()
      };

      const posts = this.postsSubject.value;
      const post = posts.find(p => p.id === postId);
      
      if (post) {
        post.comments = [...(post.comments || []), newComment];
        this.postsSubject.next([...posts]);
        observer.next(newComment);
      } else {
        observer.error('Post not found');
      }
      
      observer.complete();
    });
  }

  likePost(postId: string, userId: string): Observable<boolean> {
    return new Observable(observer => {
      const posts = this.postsSubject.value;
      const post = posts.find(p => p.id === postId);
      
      if (post) {
        const existingLike = post.likes?.find(l => l.userId === userId);
        
        if (existingLike) {
          // Unlike
          post.likes = post.likes?.filter(l => l.userId !== userId) || [];
        } else {
          // Like
          const newLike: Like = {
            id: this.generateId(),
            userId: userId,
            articleId: postId,
            type: 'like',
            createdAt: new Date()
          };
          post.likes = [...(post.likes || []), newLike];
        }
        
        this.postsSubject.next([...posts]);
        observer.next(true);
      } else {
        observer.next(false);
      }
      
      observer.complete();
    });
  }

  private loadMockPosts(): void {
    const mockPosts: Post[] = [
      {
        id: '1',
        title: 'Amazing Travel Tips for Beginners',
        content: 'Traveling can be overwhelming for beginners, but with these tips...',
        summary: 'Essential travel tips for first-time travelers',
        author: 'John Doe',
        authorId: '1',
        category: 'Travel Tips',
        tags: ['travel', 'tips', 'beginners'],
        status: 'published',
        views: 1250,
        likes: [
          { id: '1', userId: '2', articleId: '1', type: 'like', createdAt: new Date() },
          { id: '2', userId: '3', articleId: '1', type: 'like', createdAt: new Date() }
        ],
        comments: [
          {
            id: '1',
            postId: '1',
            author: 'Sarah Wilson',
            authorId: '2',
            content: 'Great tips! Thanks for sharing.',
            createdAt: new Date()
          }
        ],
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
        updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24)
      },
      {
        id: '2',
        title: 'Best Destinations in Europe',
        content: 'Europe offers incredible diversity for travelers...',
        summary: 'Top European destinations for your next trip',
        author: 'Jane Smith',
        authorId: '2',
        category: 'Destinations',
        tags: ['europe', 'destinations', 'travel'],
        status: 'published',
        views: 2100,
        likes: [
          { id: '3', userId: '1', articleId: '2', type: 'like', createdAt: new Date() }
        ],
        comments: [],
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5),
        updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3)
      }
    ];

    this.postsSubject.next(mockPosts);
  }

  private generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }
}

