// src/app/component/admin/admin-dashboard/admin-dashboard.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './admin-dashboard.html',
  styleUrls: ['./admin-dashboard.css']
})
export class AdminDashboardComponent {
  constructor(private router: Router) {}

  logout() {
    // Clear session/local storage (you can add token removal here)
    localStorage.removeItem('authToken');
    sessionStorage.clear();

    // Redirect to login page
    this.router.navigate(['/login']);
  }
}
