import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './profile.html',
  styleUrl: './profile.css'
})
export class Profile {
  avatarImage: string | null = null;

  onAvatarUpload(event: any): void {
    const file = event.target.files[0];
    if (file && this.validateImage(file)) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.avatarImage = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  validateImage(file: File): boolean {
    const maxSize = 2 * 1024 * 1024; // 2MB
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
    
    if (file.size > maxSize) {
      alert('Avatar size must be less than 2MB');
      return false;
    }
    
    if (!allowedTypes.includes(file.type)) {
      alert('Only JPG, PNG, and GIF files are allowed');
      return false;
    }
    
    return true;
  }

  triggerAvatarUpload(): void {
    const fileInput = document.getElementById('avatar-upload') as HTMLInputElement;
    fileInput.click();
  }
}
