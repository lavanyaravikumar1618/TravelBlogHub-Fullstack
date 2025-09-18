import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

export interface UploadProgress {
  file: File;
  progress: number;
  status: 'uploading' | 'completed' | 'error';
  url?: string;
  error?: string;
}

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  private uploadProgressSubject = new BehaviorSubject<UploadProgress[]>([]);
  public uploadProgress$ = this.uploadProgressSubject.asObservable();

  constructor() {}

  uploadImage(file: File): Observable<UploadProgress> {
    return new Observable(observer => {
      const uploadProgress: UploadProgress = {
        file: file,
        progress: 0,
        status: 'uploading'
      };

      // Simulate file upload progress
      const interval = setInterval(() => {
        uploadProgress.progress += Math.random() * 30;
        
        if (uploadProgress.progress >= 100) {
          uploadProgress.progress = 100;
          uploadProgress.status = 'completed';
          uploadProgress.url = this.generateMockUrl(file);
          clearInterval(interval);
          observer.next(uploadProgress);
          observer.complete();
        } else {
          observer.next(uploadProgress);
        }
      }, 200);
    });
  }

  uploadMultipleImages(files: File[]): Observable<UploadProgress[]> {
    const uploads: UploadProgress[] = files.map(file => ({
      file: file,
      progress: 0,
      status: 'uploading'
    }));

    this.uploadProgressSubject.next(uploads);

    return new Observable(observer => {
      let completedUploads = 0;
      
      files.forEach((file, index) => {
        this.uploadImage(file).subscribe({
          next: (progress) => {
            uploads[index] = progress;
            this.uploadProgressSubject.next([...uploads]);
            observer.next([...uploads]);
          },
          complete: () => {
            completedUploads++;
            if (completedUploads === files.length) {
              observer.complete();
            }
          }
        });
      });
    });
  }

  validateImage(file: File): { valid: boolean; error?: string } {
    const maxSize = 5 * 1024 * 1024; // 5MB
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];

    if (file.size > maxSize) {
      return { valid: false, error: 'File size must be less than 5MB' };
    }

    if (!allowedTypes.includes(file.type)) {
      return { valid: false, error: 'Only JPEG, PNG, GIF, and WebP images are allowed' };
    }

    return { valid: true };
  }

  deleteImage(imageUrl: string): Observable<boolean> {
    // Simulate API call to delete image
    return new Observable(observer => {
      setTimeout(() => {
        observer.next(true);
        observer.complete();
      }, 500);
    });
  }

  private generateMockUrl(file: File): string {
    // Generate a mock URL for the uploaded file
    return `https://example.com/uploads/${Date.now()}-${file.name}`;
  }

  getUploadProgress(): UploadProgress[] {
    return this.uploadProgressSubject.value;
  }

  clearUploadProgress(): void {
    this.uploadProgressSubject.next([]);
  }
}

