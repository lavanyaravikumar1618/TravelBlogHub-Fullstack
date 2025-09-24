import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { finalize, take } from 'rxjs/operators';
import { AuthService } from '../../../../service/auth.service';

@Component({
  selector: 'app-user-login',
  standalone: true,
  imports: [FormsModule, RouterModule, CommonModule],
  templateUrl: './user-login.html',
  styleUrls: ['./user-login.css']
})
export class UserLoginComponent {
  email: string = '';
  password: string = '';
  isLoading: boolean = false;
  errorMessage: string = '';

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  onLogin(): void {
    this.errorMessage = '';

    if (!this.email || !this.password) {
      this.errorMessage = 'Please fill in all fields';
      return;
    }

    this.isLoading = true;

    this.authService.login(this.email, this.password)
      .pipe(
        take(1),
        finalize(() => {
          // ensure loading state is reset even if error occurs
          this.isLoading = false;
        })
      )
      .subscribe({
        next: (success: boolean) => {
          if (success) {
            // replace with real toast if you have one
            alert('Login Successful! Welcome back!');
            this.router.navigate(['/user-dashboard']);
          } else {
            this.handleLoginFailure('Invalid email or password');
          }
        },
        error: (err) => {
          console.error('Login error:', err);
          this.handleLoginFailure('Login failed. Please try again.');
        }
      });
  }

  private handleLoginFailure(message: string) {
    this.errorMessage = message;
    // clear sensitive field to encourage re-entry
    this.password = '';
    // optionally set focus back to password or email input via ViewChild (not included here)
  }

  // small helpers used by template links (if you wire buttons instead of routerLink)
  goToRegister(): void {
    this.router.navigate(['/register']);
  }

  goToForgotPassword(): void {
    this.router.navigate(['/forgot-password']);
  }
}
