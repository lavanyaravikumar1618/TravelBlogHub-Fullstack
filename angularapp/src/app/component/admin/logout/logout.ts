// src/app/component/admin/logout/logout.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './logout.html',
  styleUrls: ['./logout.css']
})
export class LogoutComponent {
  constructor(private router: Router) {}

  logout() {
    // In real app: clear localStorage/sessionStorage tokens
    alert("You have been logged out.");
    this.router.navigate(['/']); // Redirect to home/login
  }
}
