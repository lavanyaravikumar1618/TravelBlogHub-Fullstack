import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-manage-users',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './manage-users.html',
  styleUrls: ['./manage-users.css']
})
export class ManageUsersComponent {
  users = [
    { name: 'Lavanya', email: 'lavanya@example.com', role: 'admin', isBanned: false, articlesCount: 12, likesCount: 40 },
    { name: 'Rahul', email: 'rahul@example.com', role: 'editor', isBanned: false, articlesCount: 8, likesCount: 22 },
    { name: 'Priya', email: 'priya@example.com', role: 'user', isBanned: true, articlesCount: 2, likesCount: 5 }
  ];

  search = '';
  loading = false;
  page = 1;
  limit = 5;
  total = this.users.length;

  onSearch() {
    console.log('Searching for:', this.search);
  }

  changeRole(user: any, newRole: string) {
    user.role = newRole;
  }

  toggleBan(user: any) {
    user.isBanned = !user.isBanned;
  }

  deleteUser(user: any) {
    this.users = this.users.filter(u => u !== user);
    this.total = this.users.length;
  }

  prevPage() {
    if (this.page > 1) this.page--;
  }

  nextPage() {
    if (this.page * this.limit < this.total) this.page++;
  }
}
