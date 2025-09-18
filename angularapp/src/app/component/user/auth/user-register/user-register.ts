import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../../service/auth.service';

@Component({
  selector: 'app-user-register',
  standalone: true,
  imports: [FormsModule, RouterModule, CommonModule],
  templateUrl: './user-register.html',
  styleUrls: ['./user-register.css']
})
export class UserRegisterComponent {
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  country: string = '';
  agreeTerms: boolean = false;
  newsletter: boolean = false;
  isLoading: boolean = false;
  errorMessage: string = '';

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  onRegister() {
    if (!this.validateForm()) {
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    const userData = {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      password: this.password,
      country: this.country,
      newsletter: this.newsletter
    };

    this.authService.register(userData).subscribe({
      next: (success) => {
        this.isLoading = false;
        if (success) {
          alert('Registration Successful! Welcome to Travel BlogHub!');
          this.router.navigate(['/user-dashboard']);
        } else {
          this.errorMessage = 'Registration failed. Please try again.';
        }
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMessage = 'Registration failed. Please try again.';
        console.error('Registration error:', error);
      }
    });
  }

  private validateForm(): boolean {
    if (!this.firstName || !this.lastName || !this.email || !this.password || !this.confirmPassword) {
      this.errorMessage = 'Please fill in all required fields';
      return false;
    }

    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match';
      return false;
    }

    if (this.password.length < 6) {
      this.errorMessage = 'Password must be at least 6 characters long';
      return false;
    }

    if (!this.agreeTerms) {
      this.errorMessage = 'Please agree to the terms and conditions';
      return false;
    }

    return true;
  }
}
