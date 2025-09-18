import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [FormsModule, RouterModule, CommonModule],
  templateUrl: './admin-login.html',
  styleUrls: ['./admin-login.css']
})
export class AdminLoginComponent {
  username = '';
  password = '';
  isLoading = false;
  errorMessage = '';

  constructor(private router: Router) {}

  onSubmit() {
    this.errorMessage = '';
    if (!this.username || !this.password) {
      this.errorMessage = 'Please fill in both fields';
      return;
    }

    this.isLoading = true;

    // Simulate login check
    setTimeout(() => {
      this.isLoading = false;
      if (this.username === 'admin' && this.password === 'admin123') {
        alert('Admin login successful!');
        this.router.navigate(['/admin-dashboard']);
      } else {
        this.errorMessage = 'Invalid username or password';
      }
    }, 1000);
  }
}
