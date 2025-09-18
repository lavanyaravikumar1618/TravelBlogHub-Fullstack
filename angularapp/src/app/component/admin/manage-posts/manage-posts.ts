import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-manage-posts',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './manage-posts.html',
  styleUrls: ['./manage-posts.css']
})
export class ManagePosts {
  posts = [
    { id: 1, title: 'Understanding Angular 15', content: 'Full content of Angular 15...', author: 'Vinayaka' },
    { id: 2, title: 'Spring Boot Basics', content: 'Full content of Spring Boot...', author: 'Lavanya' }
  ];

  newPost = { title: '', content: '', author: '' };

  addPost() {
    if (this.newPost.title && this.newPost.content && this.newPost.author) {
      const id = this.posts.length + 1;
      this.posts.push({ id, ...this.newPost });
      this.newPost = { title: '', content: '', author: '' };
    }
  }

  deletePost(id: number) {
    this.posts = this.posts.filter(post => post.id !== id);
  }
}
