import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../../service/auth.service';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [FormsModule, RouterModule, CommonModule],
  templateUrl: './forgot-password.html',
  styleUrls: ['./forgot-password.css']
})
export class ForgotPasswordComponent {
  newPassword = '';
  confirmPassword = '';
  isLoading = false;
  errorMessage = '';
  successMessage = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  get passwordsMismatch(): boolean {
    return !!this.newPassword && !!this.confirmPassword && this.newPassword !== this.confirmPassword;
  }

  onSubmit() {
    this.errorMessage = '';
    this.successMessage = '';

    if (!this.newPassword || !this.confirmPassword) {
      this.errorMessage = 'Please fill both password fields.';
      return;
    }

    if (this.newPassword.length < 8) {
      this.errorMessage = 'Password must be at least 8 characters.';
      return;
    }

    if (this.passwordsMismatch) {
      this.errorMessage = 'Passwords do not match.';
      return;
    }

    this.isLoading = true;

    this.authService.resetPassword(this.newPassword).subscribe({
      next: () => {
        this.isLoading = false;
        this.successMessage = 'Your password has been changed successfully.';
        setTimeout(() => this.router.navigate(['/user-login']), 1500);
      },
      error: (err: any) => {
        this.isLoading = false;
        this.errorMessage = 'Failed to reset password. Please try again.';
        console.error('Reset password error:', err);
      }
    });
  }
}
