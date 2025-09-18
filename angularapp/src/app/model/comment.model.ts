export interface Comment {
  id: string;
  postId: string;
  author: string;
  authorId: string;
  content: string;
  createdAt: Date;
  updatedAt?: Date;
  parentId?: string; // For nested comments
  isApproved: boolean;
  likes?: number;
}

export interface CommentCreateRequest {
  postId: string;
  content: string;
  parentId?: string;
}

export interface CommentUpdateRequest {
  content: string;
}

