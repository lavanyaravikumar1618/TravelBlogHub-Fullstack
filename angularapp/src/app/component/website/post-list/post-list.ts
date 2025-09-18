import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './post-list.html',
  styleUrls: ['./post-list.css']
})
export class PostList {
  posts = [
    { id: 1, title: 'Understanding Angular 15', summary: 'Learn Angular standalone components...', author: 'Vinayaka', date: '2025-09-11' },
    { id: 2, title: 'Spring Boot Basics', summary: 'Introduction to building REST APIs...', author: 'Lavanya', date: '2025-09-10' },
    { id: 3, title: 'Fullstack Blog App', summary: 'Integrating Angular frontend with Spring Boot backend...', author: 'Vinayaka', date: '2025-09-09' }
  ];
}
