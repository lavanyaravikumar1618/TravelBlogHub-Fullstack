import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { UploadService, UploadProgress } from '../../../../../service/upload.service';
import { PostService } from '../../../../../service/post.service';
import { Post } from '../../../../../model/post.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-write',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './write.html',
  styleUrl: './write.css'
})
export class Write implements OnInit, OnDestroy {
  // Form data
  title: string = '';
  destination: string = '';
  category: string = '';
  story: string = '';
  tips: string = '';
  
  // Image upload
  uploadedImages: { name: string; url: string; file: File }[] = [];
  uploadProgress: UploadProgress[] = [];
  isUploading: boolean = false;
  uploadError: string = '';
  
  // Form state
  isSubmitting: boolean = false;
  submitError: string = '';
  
  private uploadSubscription?: Subscription;

  constructor(
    private uploadService: UploadService,
    private postService: PostService
  ) {}

  ngOnInit(): void {
    // Subscribe to upload progress
    this.uploadService.uploadProgress$.subscribe((progress: UploadProgress[]) => {
      this.uploadProgress = progress;
      this.isUploading = progress.some((p: UploadProgress) => p.status === 'uploading');
    });
  }

  ngOnDestroy(): void {
    if (this.uploadSubscription) {
      this.uploadSubscription.unsubscribe();
    }
  }

  onImageUpload(event: any): void {
    const files = event.target.files;
    if (files && files.length > 0) {
      const fileArray = Array.from(files) as File[];
      
      // Validate all files first
      const validFiles: File[] = [];
      for (const file of fileArray) {
        const validation = this.uploadService.validateImage(file);
        if (validation.valid) {
          validFiles.push(file);
        } else {
          this.uploadError = validation.error || 'Invalid file';
          return;
        }
      }

      // Upload valid files
      this.uploadError = '';
      this.uploadSubscription = this.uploadService.uploadMultipleImages(validFiles).subscribe({
        next: (progress: UploadProgress[]) => {
          this.uploadProgress = progress;
          this.isUploading = progress.some((p: UploadProgress) => p.status === 'uploading');
        },
        complete: () => {
          // Add completed uploads to uploadedImages
          this.uploadProgress.forEach((progress: UploadProgress) => {
            if (progress.status === 'completed' && progress.url) {
              this.uploadedImages.push({
                name: progress.file.name,
                url: progress.url,
                file: progress.file
              });
            }
          });
          this.uploadService.clearUploadProgress();
        },
        error: (error: any) => {
          this.uploadError = 'Upload failed. Please try again.';
          console.error('Upload error:', error);
        }
      });
    }
  }

  validateImage(file: File): boolean {
    const validation = this.uploadService.validateImage(file);
    if (!validation.valid) {
      this.uploadError = validation.error || 'Invalid file';
    }
    return validation.valid;
  }

  triggerFileInput(): void {
    const fileInput = document.getElementById('images') as HTMLInputElement;
    fileInput.click();
  }

  removeImage(index: number): void {
    const image = this.uploadedImages[index];
    if (image.url.startsWith('https://')) {
      // If it's an uploaded image, delete it from server
      this.uploadService.deleteImage(image.url).subscribe({
        next: (success: boolean) => {
          if (success) {
            this.uploadedImages.splice(index, 1);
          }
        },
        error: (error: any) => {
          console.error('Error deleting image:', error);
          // Still remove from local array
          this.uploadedImages.splice(index, 1);
        }
      });
    } else {
      // If it's a local preview, just remove it
      this.uploadedImages.splice(index, 1);
    }
  }

  onSubmit(): void {
    if (!this.validateForm()) {
      return;
    }

    this.isSubmitting = true;
    this.submitError = '';

    const postData = {
      title: this.title,
      content: this.story,
      summary: this.tips,
      author: 'Current User', // In real app, get from auth service
      authorId: '1',
      category: this.category,
      tags: [this.destination.toLowerCase(), this.category.toLowerCase()],
      status: 'draft' as const,
      views: 0
    };

    this.postService.createPost(postData).subscribe({
      next: (post: Post) => {
        this.isSubmitting = false;
        alert('Article saved successfully!');
        this.resetForm();
      },
      error: (error: any) => {
        this.isSubmitting = false;
        this.submitError = 'Failed to save article. Please try again.';
        console.error('Submit error:', error);
      }
    });
  }

  private validateForm(): boolean {
    if (!this.title || !this.destination || !this.category || !this.story) {
      this.submitError = 'Please fill in all required fields';
      return false;
    }

    if (this.story.length < 100) {
      this.submitError = 'Your travel story must be at least 100 characters long';
      return false;
    }

    return true;
  }

  private resetForm(): void {
    this.title = '';
    this.destination = '';
    this.category = '';
    this.story = '';
    this.tips = '';
    this.uploadedImages = [];
    this.uploadError = '';
    this.submitError = '';
  }
}
