export interface Recipe {
  id: string;
  title: string;
  description: string;
  author: string;
  image: string;
  category?: string;
  cookTime: number;
  prepTime?: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  servings: number;
  defaultServings: number;
  rating: number;
  reviews: number;
  ingredients: {
    name: string;
    amount: number;
    unit: string;
  }[];
  instructions: string[];
  notes?: string;
  tags?: string[];
  nutrition?: Record<string, string>;
  createdAt: string;
  updatedAt: string;
}