import { Component } from '@angular/core';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.html',
  styleUrls: ['./user-register.css']
})
export class UserRegisterComponent {
  // simple bindings used by template — replace with your actual logic
  firstName = '';
  lastName = '';
  email = '';
  country = '';
  password = '';
  confirmPassword = '';
  agreeTerms = false;
  newsletter = false;
  isLoading = false;
  errorMessage: string | null = null;

  onRegister() {
    // placeholder registration handler
    this.isLoading = true;
    this.errorMessage = null;

    // simulate async register (replace with real service)
    setTimeout(() => {
      this.isLoading = false;
      // basic validation example
      if (!this.firstName || !this.email) {
        this.errorMessage = 'Please fill required fields.';
      } else {
        // success path
        console.log('Registered', { firstName: this.firstName, email: this.email });
        // reset for demo
        this.firstName = this.lastName = this.email = this.country = this.password = this.confirmPassword = '';
        this.agreeTerms = this.newsletter = false;
      }
    }, 700);
  }
}
