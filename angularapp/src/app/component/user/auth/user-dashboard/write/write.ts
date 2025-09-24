import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface UploadedImage {
  name: string;
  url: string;
  file?: File;
}

interface UploadProgress {
  file: File;
  progress: number; // 0-100
}

@Component({
  selector: 'app-write',
  standalone: true,                 // make standalone so we can import modules directly
  imports: [CommonModule, FormsModule], // gives *ngIf, *ngFor, ngModel, number pipe, ngForm, etc.
  templateUrl: './write.html',
  styleUrls: ['./write.css']
})
export class Write {
  // Template-driven model properties
  title = '';
  destination = '';
  category = '';
  story = '';
  tips = '';

  // state
  submitError = '';
  uploadError = '';
  isUploading = false;
  isSubmitting = false;

  // uploaded previews and progress
  uploadedImages: UploadedImage[] = [];
  uploadProgress: UploadProgress[] = [];

  // categories (if you want to render dynamically)
  categories = [
    { value: '', label: 'Select a category' },
    { value: 'adventure', label: 'Adventure' },
    { value: 'budget', label: 'Budget Travel' },
    { value: 'solo', label: 'Solo Travel' },
    { value: 'family', label: 'Family Travel' },
    { value: 'luxury', label: 'Luxury Travel' },
    { value: 'cultural', label: 'Cultural' }
  ];

  // Trigger hidden file input click
  triggerFileInput() {
    const input = document.getElementById('images') as HTMLInputElement | null;
    input?.click();
  }

  // When user selects files via input
  onImageUpload(event: Event) {
    const input = event.target as HTMLInputElement;
    const files = input.files ? Array.from(input.files) : [];
    if (!files.length) return;
    this.addFiles(files);
    input.value = ''; // reset so same file can be selected again
  }

  // Add files -> create previews and start simulated upload
  addFiles(files: File[]) {
    const valid: File[] = [];
    for (const f of files) {
      if (!f.type.startsWith('image/')) continue;
      if (f.size > 5 * 1024 * 1024) {
        // skip large files; optionally show error
        this.uploadError = `File "${f.name}" is larger than 5MB and was skipped.`;
        continue;
      }
      valid.push(f);
    }
    if (!valid.length) return;

    this.isUploading = true;
    for (const f of valid) {
      const url = URL.createObjectURL(f);
      this.uploadedImages.push({ name: f.name, url, file: f });
      this.uploadProgress.push({ file: f, progress: 0 });
    }
    // simulate upload for each
    this.simulateAllUploads().then(() => {
      this.isUploading = false;
      this.uploadError = '';
    }).catch(err => {
      console.error(err);
      this.isUploading = false;
      this.uploadError = 'Upload failed. Try again.';
    });
  }

  // Simulate upload progress for each file (replace with real API later)
  private async simulateAllUploads() {
    const tasks = this.uploadProgress.map(p => this.simulateProgress(p));
    await Promise.all(tasks);
  }

  private async simulateProgress(p: UploadProgress) {
    p.progress = 0;
    while (p.progress < 100) {
      // small delay
      await this.delay(70 + Math.random() * 150);
      p.progress = Math.min(100, p.progress + Math.round(6 + Math.random() * 22));
    }
    // small delay at full
    await this.delay(120);
  }

  private delay(ms: number) {
    return new Promise<void>(res => setTimeout(res, ms));
  }

  removeImage(index: number) {
    const removed = this.uploadedImages.splice(index, 1)[0];
    // clean any object URL
    if (removed?.url) URL.revokeObjectURL(removed.url);
    // also remove progress entry for that file
    const fileName = removed?.name;
    this.uploadProgress = this.uploadProgress.filter(p => p.file.name !== fileName);
  }

  // Form submit handler
  async onSubmit() {
    this.submitError = '';
    if (!this.title?.trim() || !this.destination?.trim() || !this.category?.trim() || !this.story?.trim()) {
      this.submitError = 'Please fill the required fields: Title, Destination, Category and Story.';
      return;
    }
    try {
      this.isSubmitting = true;
      // Ensure any remaining uploads finish (if still in progress)
      await this.simulateAllUploads();
      // Prepare payload (replace with real API call)
      const payload = {
        title: this.title,
        destination: this.destination,
        category: this.category,
        story: this.story,
        tips: this.tips,
        images: this.uploadedImages.map(i => i.file?.name ?? i.name)
      };
      console.log('Submitting:', payload);
      // simulate network delay
      await this.delay(800);
      alert('Published (simulated)! 🎉');
      // Optional: reset form
      this.resetForm();
    } catch (err) {
      console.error(err);
      this.submitError = 'Publish failed. Try again.';
    } finally {
      this.isSubmitting = false;
    }
  }

  resetForm() {
    this.title = '';
    this.destination = '';
    this.category = '';
    this.story = '';
    this.tips = '';
    // revoke URLs
    this.uploadedImages.forEach(i => i.url && URL.revokeObjectURL(i.url));
    this.uploadedImages = [];
    this.uploadProgress = [];
    this.submitError = '';
    this.uploadError = '';
  }
}
