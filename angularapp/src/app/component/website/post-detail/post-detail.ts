import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-post-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './post-detail.html',
  styleUrls: ['./post-detail.css']
})
export class PostDetail {
  postId: number = 0;
  post: any;
  newComment: string = '';
  likes: number = 0;

  posts = [
    { id: 1, title: 'Understanding Angular 15', content: 'Full article content for Angular 15...', author: 'Vinayaka', date: '2025-09-11' },
    { id: 2, title: 'Spring Boot Basics', content: 'Full article content for Spring Boot...', author: 'Lavanya', date: '2025-09-10' },
    { id: 3, title: 'Fullstack Blog App', content: 'Full article content for fullstack app...', author: 'Vinayaka', date: '2025-09-09' }
  ];

  comments: string[] = [];

  constructor(private route: ActivatedRoute) {
    this.postId = Number(this.route.snapshot.paramMap.get('id'));
    this.post = this.posts.find(p => p.id === this.postId);
  }

  addComment() {
    if (this.newComment.trim()) {
      this.comments.push(this.newComment.trim());
      this.newComment = '';
    }
  }

  addLike() {
    this.likes++;
  }
}
