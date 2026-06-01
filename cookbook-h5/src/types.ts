export type TabValue = 'home' | 'recipes' | 'upload' | 'profile';
export type ScreenState = TabValue | 'recipe_detail' | 'my_uploads' | 'my_favorites' | 'my_suggestions' | 'review_modal';

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
