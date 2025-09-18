// src/app/model/user.model.ts
export interface User {
  _id: string;
  name: string;
  email: string;
  role: 'user' | 'editor' | 'admin';
  isBanned: boolean;
  createdAt?: string;
  articlesCount?: number;
  likesCount?: number;
}
