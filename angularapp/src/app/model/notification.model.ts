export interface Notification {
  id: string;
  userId: string;
  type: 'like' | 'comment' | 'follow' | 'article_approved' | 'system';
  title: string;
  message: string;
  isRead: boolean;
  data?: {
    articleId?: string;
    commentId?: string;
    userId?: string;
  };
  createdAt: Date;
  readAt?: Date;
}

export interface NotificationSettings {
  userId: string;
  emailNotifications: boolean;
  pushNotifications: boolean;
  likeNotifications: boolean;
  commentNotifications: boolean;
  followNotifications: boolean;
  systemNotifications: boolean;
}

