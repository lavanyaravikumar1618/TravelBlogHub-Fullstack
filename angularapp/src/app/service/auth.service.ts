import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  role: 'user' | 'admin';
  isActive: boolean;
  createdAt: Date;
  // NOTE: we intentionally don't store plaintext passwords here.
  // In a real app, passwords are handled by the backend.
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor() {
    // Check for stored user data on service initialization
    this.loadUserFromStorage();
  }

  login(email: string, password: string): Observable<boolean> {
    // Simulate API call
    return new Observable(observer => {
      setTimeout(() => {
        // Mock user data
        const user: User = {
          id: '1',
          email: email,
          firstName: 'John',
          lastName: 'Doe',
          avatar: '',
          role: 'user',
          isActive: true,
          createdAt: new Date()
        };
        
        this.setCurrentUser(user);
        observer.next(true);
        observer.complete();
      }, 1000);
    });
  }

  register(userData: any): Observable<boolean> {
    // Simulate API call
    return new Observable(observer => {
      setTimeout(() => {
        const user: User = {
          id: '1',
          email: userData.email,
          firstName: userData.firstName,
          lastName: userData.lastName,
          avatar: '',
          role: 'user',
          isActive: true,
          createdAt: new Date()
        };
        
        this.setCurrentUser(user);
        observer.next(true);
        observer.complete();
      }, 1000);
    });
  }

  logout(): void {
    this.currentUserSubject.next(null);
    localStorage.removeItem('currentUser');
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  isAuthenticated(): boolean {
    return this.currentUserSubject.value !== null;
  }

  isAdmin(): boolean {
    return this.currentUserSubject.value?.role === 'admin';
  }

  private setCurrentUser(user: User): void {
    this.currentUserSubject.next(user);
    localStorage.setItem('currentUser', JSON.stringify(user));
  }

  private loadUserFromStorage(): void {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser) as User;
        this.currentUserSubject.next(user);
      } catch (error) {
        console.error('Error loading user from storage:', error);
        localStorage.removeItem('currentUser');
      }
    }
  }

  /**
   * Mock reset password for the currently authenticated user.
   * In a real application this should call your backend API which will
   * validate authentication / token and persist the new password securely.
   *
   * Here we simply simulate a server call and update the stored user metadata.
   */
  resetPassword(newPassword: string): Observable<boolean> {
    return new Observable(observer => {
      setTimeout(() => {
        const current = this.currentUserSubject.value;
        if (!current) {
          observer.error(new Error('No authenticated user. Cannot reset password in this mock flow.'));
          return;
        }

        // NOTE: We DO NOT store plaintext passwords in this mock.
        // To simulate, we update a metadata field (not declared on User) and persist.
        // This keeps the rest of your app working while reminding you to implement server logic.
        const updatedUser = {
          ...current,
          // @ts-ignore - attach mock metadata for demo only
          passwordUpdatedAt: new Date().toISOString()
        };

        // Persist updated user (this will include the metadata only in localStorage)
        try {
          localStorage.setItem('currentUser', JSON.stringify(updatedUser));
          // update subject (strip metadata when returning User shape if necessary)
          this.currentUserSubject.next(updatedUser as unknown as User);
          observer.next(true);
          observer.complete();
        } catch (err) {
          observer.error(new Error('Failed to persist user data locally.'));
        }
      }, 800);
    });
  }

  /**
   * OPTIONAL: Example stub for token-based reset (email flow).
   * Uncomment and adapt if your backend exposes a token-based endpoint.
   *
   * resetPasswordWithToken(token: string, newPassword: string): Observable<any> {
   *   // return this.http.post('/api/auth/reset-password', { token, password: newPassword });
   * }
   *
   * Security reminder:
   * - Always perform password changes on the server.
   * - Never accept a password change request without verifying the user (session or token).
   * - Never store plaintext passwords on the client or in localStorage.
   */
}
