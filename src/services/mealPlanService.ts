import { Recipe } from '../types/recipe';
import { fetchRecipeById } from './recipeService';

// Mock meal plan data
interface MealPlanItem {
  id: string;
  date: string;
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  recipe: Recipe;
}

// Sample meal plan data
let mockMealPlan: MealPlanItem[] = [];

// Function to simulate delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Initialize some mock meal plan data
const initializeMockData = async () => {
  const recipe1 = await fetchRecipeById('1');
  const recipe2 = await fetchRecipeById('2');
  const recipe3 = await fetchRecipeById('4');
  
  mockMealPlan = [
    {
      id: '1',
      date: '2025-07-20',
      mealType: 'dinner',
      recipe: recipe1
    },
    {
      id: '2',
      date: '2025-07-21',
      mealType: 'breakfast',
      recipe: recipe2
    },
    {
      id: '3',
      date: '2025-07-21',
      mealType: 'dinner',
      recipe: recipe3
    },
    {
      id: '4',
      date: '2025-07-22',
      mealType: 'lunch',
      recipe: recipe1
    }
  ];
};

// Initialize the mock data
initializeMockData();

// Get meal plan for a user
export const fetchUserMealPlan = async (userId: string): Promise<MealPlanItem[]> => {
  await delay(800);
  return mockMealPlan;
};

// Add a recipe to the meal plan
export const addToMealPlan = async (
  userId: string,
  recipeId: string,
  date: string,
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack'
): Promise<MealPlanItem> => {
  await delay(500);
  
  const recipe = await fetchRecipeById(recipeId);
  
  const newItem: MealPlanItem = {
    id: `${Date.now()}`,
    date,
    mealType,
    recipe
  };
  
  mockMealPlan.push(newItem);
  
  return newItem;
};

// Remove a recipe from the meal plan
export const removeFromMealPlan = async (itemId: string): Promise<void> => {
  await delay(500);
  mockMealPlan = mockMealPlan.filter(item => item.id !== itemId);
};