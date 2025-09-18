import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Notification, NotificationSettings } from '../model/notification.model';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notificationsSubject = new BehaviorSubject<Notification[]>([]);
  public notifications$ = this.notificationsSubject.asObservable();

  private unreadCountSubject = new BehaviorSubject<number>(0);
  public unreadCount$ = this.unreadCountSubject.asObservable();

  constructor() {
    this.loadMockNotifications();
  }

  getNotifications(): Observable<Notification[]> {
    return this.notifications$;
  }

  getUnreadCount(): Observable<number> {
    return this.unreadCount$;
  }

  markAsRead(notificationId: string): void {
    const notifications = this.notificationsSubject.value;
    const notification = notifications.find(n => n.id === notificationId);
    
    if (notification && !notification.isRead) {
      notification.isRead = true;
      notification.readAt = new Date();
      this.updateNotifications([...notifications]);
    }
  }

  markAllAsRead(): void {
    const notifications = this.notificationsSubject.value.map(notification => ({
      ...notification,
      isRead: true,
      readAt: new Date()
    }));
    this.updateNotifications(notifications);
  }

  deleteNotification(notificationId: string): void {
    const notifications = this.notificationsSubject.value.filter(n => n.id !== notificationId);
    this.updateNotifications(notifications);
  }

  createNotification(notification: Omit<Notification, 'id' | 'createdAt'>): void {
    const newNotification: Notification = {
      ...notification,
      id: this.generateId(),
      createdAt: new Date()
    };

    const notifications = [newNotification, ...this.notificationsSubject.value];
    this.updateNotifications(notifications);
  }

  getNotificationSettings(userId: string): Observable<NotificationSettings> {
    // Mock settings - in real app, this would come from API
    const settings: NotificationSettings = {
      userId: userId,
      emailNotifications: true,
      pushNotifications: true,
      likeNotifications: true,
      commentNotifications: true,
      followNotifications: true,
      systemNotifications: true
    };

    return new Observable(observer => {
      setTimeout(() => {
        observer.next(settings);
        observer.complete();
      }, 500);
    });
  }

  updateNotificationSettings(settings: NotificationSettings): Observable<boolean> {
    // Mock API call
    return new Observable(observer => {
      setTimeout(() => {
        observer.next(true);
        observer.complete();
      }, 500);
    });
  }

  private updateNotifications(notifications: Notification[]): void {
    this.notificationsSubject.next(notifications);
    const unreadCount = notifications.filter(n => !n.isRead).length;
    this.unreadCountSubject.next(unreadCount);
  }

  private loadMockNotifications(): void {
    const mockNotifications: Notification[] = [
      {
        id: '1',
        userId: '1',
        type: 'like',
        title: 'New Like',
        message: 'Sarah liked your article "Amazing Travel Tips"',
        isRead: false,
        data: { articleId: '1' },
        createdAt: new Date(Date.now() - 1000 * 60 * 30) // 30 minutes ago
      },
      {
        id: '2',
        userId: '1',
        type: 'comment',
        title: 'New Comment',
        message: 'Mike commented on your article "Best Destinations"',
        isRead: false,
        data: { articleId: '2', commentId: '1' },
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2) // 2 hours ago
      },
      {
        id: '3',
        userId: '1',
        type: 'article_approved',
        title: 'Article Approved',
        message: 'Your article "Travel Guide to Japan" has been approved and published',
        isRead: true,
        data: { articleId: '3' },
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24) // 1 day ago
      }
    ];

    this.updateNotifications(mockNotifications);
  }

  private generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }
}

