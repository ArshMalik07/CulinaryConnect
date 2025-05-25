import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, User, Star } from 'lucide-react';
import { Recipe } from '../../types/recipe';

interface RecipeCardProps {
  recipe: Recipe;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
  return (
    <Link 
      to={`/recipes/${recipe.id}`}
      className="group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
    >
      <div className="relative h-48 overflow-hidden">
        <img 
          src={recipe.image} 
          alt={recipe.title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {recipe.category && (
          <span className="absolute top-2 left-2 bg-primary-500 text-white px-2 py-1 rounded-full text-xs font-medium">
            {recipe.category}
          </span>
        )}
      </div>
      
      <div className="p-4">
        <h3 className="font-serif font-bold text-lg text-gray-900 group-hover:text-primary-600 transition-colors duration-200">
          {recipe.title}
        </h3>
        
        <p className="text-gray-600 text-sm mt-2 line-clamp-2">{recipe.description}</p>
        
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center space-x-1">
            <User size={14} className="text-gray-500" />
            <span className="text-xs text-gray-500">{recipe.author}</span>
          </div>
          
          <div className="flex items-center space-x-1">
            <Clock size={14} className="text-gray-500" />
            <span className="text-xs text-gray-500">{recipe.cookTime} min</span>
          </div>
          
          <div className="flex items-center space-x-1">
            <Star size={14} className="text-accent-500 fill-accent-500" />
            <span className="text-xs text-gray-500">{recipe.rating}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default RecipeCard;