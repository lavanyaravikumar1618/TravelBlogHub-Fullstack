export interface Post {
  id: string;
  title: string;
  content: string;
  summary: string;
  author: string;
  authorId: string;
  category: string;
  tags: string[];
  status: 'draft' | 'published' | 'archived';
  views: number;
  likes?: any[]; // Will be properly typed in service
  comments?: any[]; // Will be properly typed in service
  createdAt: Date;
  updatedAt: Date;
}

export interface PostCreateRequest {
  title: string;
  content: string;
  summary: string;
  category: string;
  tags: string[];
}

export interface PostUpdateRequest {
  title?: string;
  content?: string;
  summary?: string;
  category?: string;
  tags?: string[];
  status?: 'draft' | 'published' | 'archived';
}
