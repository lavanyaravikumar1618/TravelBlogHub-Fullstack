export interface Category {
  id: string;
  name: string;
  description: string;
  slug: string;
  color: string;
  icon: string;
  isActive: boolean;
  articleCount: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface CategoryCreateRequest {
  name: string;
  description: string;
  color: string;
  icon: string;
}

