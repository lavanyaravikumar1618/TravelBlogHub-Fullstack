import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-settings',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './admin-settings.html',
  styleUrls: ['./admin-settings.css']
})
export class AdminSettingsComponent {
  blogTitle: string = '';
  description: string = '';
  theme: string = 'light';

  // ✅ Add this method
  saveSettings() {
    console.log('Settings saved:', {
      blogTitle: this.blogTitle,
      description: this.description,
      theme: this.theme
    });

    alert('Settings have been saved successfully!');
  }
}
