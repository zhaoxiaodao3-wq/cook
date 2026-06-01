export type TabValue = 'home' | 'all-recipes' | 'upload' | 'profile';

export interface Recipe {
  id: string;
  title: string;
  author: string;
  authorAvatar?: string;
  image: string;
  rating: number;
  likes: number;
  timeLabel?: string;
  difficulty?: string;
  tags?: string[];
  isNew?: boolean;
  status?: 'published' | 'reviewing' | 'draft';
}

export interface Ingredient {
  id?: string;
  name: string;
  amount: number;
  unit: string;
  sort_order: number;
}

export interface Step {
  id?: string;
  step_number: number;
  description: string;
  image?: string | null;
  duration?: number | null;
}

export interface DishCreateData {
  name: string;
  cover?: string;
  description?: string;
  category_id: number;
  cooking_time?: number;
  difficulty?: number;
  servings?: number;
  tips?: string;
  nutrition?: string;
  suitable_for?: string;
  status: 'published' | 'draft';
  ingredients: Ingredient[];
  steps: Step[];
}

export interface UserOut {
  id: string;
  nickname: string;
  avatar_url: string | null;
  role: string;
  created_at: string;
}

export interface CategoryOut {
  id: number;
  name: string;
  icon: string | null;
  sort_order: number;
}

export interface DishListOut {
  id: string;
  name: string;
  cover: string | null;
  category_id: number;
  cooking_time: number | null;
  difficulty: number | null;
  avg_rating: number;
  rating_count?: number;
  author: UserOut;
  created_at: string;
}

export interface DishDetailOut extends DishListOut {
  description: string | null;
  category: CategoryOut;
  servings: number | null;
  tips: string | null;
  nutrition?: string;
  suitable_for?: string;
  status: string;
  ingredients: Ingredient[];
  steps: Step[];
  updated_at: string;
}

export interface PaginatedData<T> {
  items: T[];
  total: number;
  page: number;
  page_size: number;
}

export interface ApiResponse<T> {
  code: number;
  message: string;
  data: T;
}

export interface LoginOut {
  access_token: string;
  token_type: string;
  user: UserOut;
}
