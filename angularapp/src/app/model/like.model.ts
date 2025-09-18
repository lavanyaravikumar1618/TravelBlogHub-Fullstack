export interface Like {
  id: string;
  userId: string;
  articleId: string;
  type: 'like' | 'dislike';
  createdAt: Date;
}

export interface LikeStats {
  articleId: string;
  totalLikes: number;
  totalDislikes: number;
  userLiked: boolean;
  userDisliked: boolean;
}

