// src/app/component/admin/manage-likes/manage-likes.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-manage-likes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './manage-likes.html',
  styleUrls: ['./manage-likes.css']
})
export class ManageLikesComponent {
  likes = [
    { id: 1, article: 'How to Start Blogging', user: 'John Doe', date: '2025-09-10' },
    { id: 2, article: 'Top 10 Angular Tips', user: 'Jane Smith', date: '2025-09-11' },
    { id: 3, article: 'Understanding Spring Boot', user: 'Alex Brown', date: '2025-09-12' },
    { id: 4, article: 'Blogger Platform Styling', user: 'Chris Lee', date: '2025-09-13' }
  ];

  page = 1;
  limit = 5;
  total = this.likes.length;

  get totalPages(): number {
    return Math.ceil(this.total / this.limit);
  }

  removeLike(like: any) {
    this.likes = this.likes.filter(l => l.id !== like.id);
    this.total = this.likes.length;
  }

  prevPage() {
    if (this.page > 1) this.page--;
  }

  nextPage() {
    if (this.page * this.limit < this.total) this.page++;
  }
}
