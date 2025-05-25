import React from 'react';
import RecipeCard from './RecipeCard';
import { Recipe } from '../../types/recipe';

interface RecipeGridProps {
  recipes: Recipe[];
  title?: string;
}

const RecipeGrid: React.FC<RecipeGridProps> = ({ recipes, title }) => {
  return (
    <div className="w-full">
      {title && (
        <h2 className="font-serif text-2xl md:text-3xl font-bold text-gray-900 mb-6">{title}</h2>
      )}
      
      {recipes.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">No recipes found. Try adjusting your filters.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {recipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      )}
    </div>
  );
};

export default RecipeGrid;