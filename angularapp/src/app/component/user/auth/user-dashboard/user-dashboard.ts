import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, NavigationEnd } from '@angular/router';
import { filter, Subscription } from 'rxjs';

interface NotificationItem {
  id: number;
  type: string;
  message: string;
  createdAt: string | Date;
  isRead: boolean;
}

@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './user-dashboard.html',
  styleUrls: ['./user-dashboard.css']
})
export class UserDashboardComponent implements OnInit, OnDestroy {
  showNotifications = false;
  notifications: NotificationItem[] = [
    { id: 1, type: 'like', message: 'Sarah liked your article "Amazing Travel Tips"', createdAt: new Date(Date.now() - 48 * 60 * 1000), isRead: false },
    { id: 2, type: 'comment', message: 'New comment on "Top Destinations"', createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000), isRead: false },
    { id: 3, type: 'approve', message: 'Your post "Hidden Beaches" has been approved', createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000), isRead: true }
  ];

  // show/hide hero for certain child routes
  showHero = true;
  private routesWithoutHero = new Set([
    'write',
    'profile',
    'about',
    'explore' // add any child route that should NOT show the hero
  ]);

  private routerSub!: Subscription;

  constructor(private router: Router) {}

  ngOnInit() {
    // initialize based on current url
    this.updateShowHero(this.router.url);

    // update on navigation
    this.routerSub = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((e: any) => {
        this.updateShowHero(e.urlAfterRedirects ?? e.url);
      });
  }

  ngOnDestroy() {
    this.routerSub?.unsubscribe();
  }

  private updateShowHero(url: string) {
    // normalize and find the child segment after 'user-dashboard'
    // examples:
    // '/user-dashboard' -> []
    // '/user-dashboard/explore' -> ['user-dashboard','explore']
    // '/user-dashboard/write' -> ['user-dashboard','write']
    const path = url.split('?')[0].split('#')[0];
    const parts = path.split('/').filter(Boolean);
    // get segment after 'user-dashboard'
    let child = '';
    const idx = parts.indexOf('user-dashboard');
    if (idx >= 0 && parts.length > idx + 1) {
      child = parts[idx + 1];
    } else {
      child = ''; // default
    }

    // decide whether to show hero
    this.showHero = !this.routesWithoutHero.has(child);
  }

  /* ---------- Notifications ---------- */
  toggleNotifications() {
    this.showNotifications = !this.showNotifications;
  }

  markAllAsRead() {
    this.notifications = this.notifications.map(n => ({ ...n, isRead: true }));
  }

  markAsRead(notification: NotificationItem) {
    notification.isRead = true;
  }

  deleteNotification(notification: NotificationItem) {
    this.notifications = this.notifications.filter(n => n.id !== notification.id);
  }

  get unreadCount(): number {
    return this.notifications.filter(n => !n.isRead).length;
  }

  formatTime(date: string | Date) {
    const d = typeof date === 'string' ? new Date(date) : date;
    const diffMin = Math.floor((Date.now() - d.getTime()) / 60000);
    if (diffMin < 1) return 'just now';
    if (diffMin < 60) return `${diffMin}m ago`;
    if (diffMin < 1440) return `${Math.floor(diffMin / 60)}h ago`;
    return `${Math.floor(diffMin / 1440)}d ago`;
  }

  getNotificationIcon(type: string) {
    switch (type) {
      case 'like': return '❤️';
      case 'comment': return '💬';
      case 'approve': return '✅';
      default: return '🔔';
    }
  }

  /* ---------- Hero button helpers ---------- */
  goHome() {
    this.router.navigate(['/user-dashboard']);
  }

  goToWrite() {
    this.router.navigate(['/user-dashboard', 'write']);
  }

  goToExplore() {
    this.router.navigate(['/user-dashboard', 'explore']);
  }

  /* Close dropdown when clicking outside */
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest('.notification-container') && this.showNotifications) {
      this.showNotifications = false;
    }
  }
}
