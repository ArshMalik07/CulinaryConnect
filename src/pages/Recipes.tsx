import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import RecipeGrid from '../components/recipe/RecipeGrid';
import RecipeFilters from '../components/recipe/RecipeFilters';
import { Recipe } from '../types/recipe';
import { fetchRecipes } from '../services/recipeService';

const Recipes: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<Record<string, any>>({
    search: searchParams.get('search') || '',
    category: searchParams.get('category') || '',
    cookTime: '',
    rating: 0
  });

  useEffect(() => {
    const loadRecipes = async () => {
      try {
        setLoading(true);
        const data = await fetchRecipes(filters);
        setRecipes(data);
      } catch (error) {
        console.error('Error loading recipes:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadRecipes();
  }, [filters]);

  const handleFilterChange = (newFilters: Record<string, any>) => {
    setFilters({
      ...filters,
      ...newFilters
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="font-serif text-3xl md:text-4xl font-bold text-gray-900 mb-8">
        {filters.search ? `Search results for "${filters.search}"` : 'Recipes'}
      </h1>
      
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-1/4">
          <RecipeFilters onFilterChange={handleFilterChange} />
        </div>
        
        <div className="w-full lg:w-3/4">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
            </div>
          ) : (
            <RecipeGrid recipes={recipes} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Recipes;