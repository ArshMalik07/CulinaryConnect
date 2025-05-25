import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Clock, User, Utensils, Star, Bookmark, Share2, Printer, Plus, Minus } from 'lucide-react';
import { Recipe } from '../types/recipe';
import { fetchRecipeById } from '../services/recipeService';
import { useAuth } from '../context/AuthContext';

const RecipeDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [servings, setServings] = useState(4);
  const [activeTab, setActiveTab] = useState<'ingredients' | 'instructions'>('ingredients');
  const { isAuthenticated } = useAuth();
  
  useEffect(() => {
    const loadRecipe = async () => {
      try {
        if (!id) return;
        
        setLoading(true);
        const data = await fetchRecipeById(id);
        setRecipe(data);
      } catch (err) {
        setError('Failed to load recipe');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    loadRecipe();
  }, [id]);

  const handleServingChange = (change: number) => {
    const newServings = servings + change;
    if (newServings >= 1) {
      setServings(newServings);
    }
  };

  const getAdjustedAmount = (amount: number) => {
    const ratio = servings / (recipe?.defaultServings || 4);
    return (amount * ratio).toFixed(1).replace(/\.0$/, '');
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
        </div>
      </div>
    );
  }

  if (error || !recipe) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Recipe Not Found</h2>
          <p className="text-gray-600 mb-6">
            The recipe you're looking for doesn't exist or there was an error loading it.
          </p>
          <Link 
            to="/recipes" 
            className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg transition-colors duration-200"
          >
            Browse All Recipes
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2">
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {recipe.title}
          </h1>
          
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mb-8">
            <div className="flex items-center space-x-1">
              <User size={18} className="text-gray-500" />
              <span className="text-gray-600">{recipe.author}</span>
            </div>
            
            <div className="flex items-center space-x-1">
              <Clock size={18} className="text-gray-500" />
              <span className="text-gray-600">{recipe.cookTime} min</span>
            </div>
            
            <div className="flex items-center space-x-1">
              <Utensils size={18} className="text-gray-500" />
              <span className="text-gray-600">{recipe.difficulty}</span>
            </div>
            
            <div className="flex items-center space-x-1">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star 
                    key={star}
                    size={18} 
                    className={star <= recipe.rating ? "text-accent-500 fill-accent-500" : "text-gray-300"}
                  />
                ))}
              </div>
              <span className="text-gray-600">({recipe.reviews} reviews)</span>
            </div>
          </div>
          
          <div className="relative h-96 mb-8 rounded-lg overflow-hidden">
            <img 
              src={recipe.image} 
              alt={recipe.title} 
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="prose max-w-none mb-8">
            <p className="text-gray-700 text-lg">{recipe.description}</p>
          </div>
          
          <div className="flex mb-4 border-b border-gray-200">
            <button
              className={`px-6 py-3 font-medium ${
                activeTab === 'ingredients'
                  ? 'text-primary-600 border-b-2 border-primary-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('ingredients')}
            >
              Ingredients
            </button>
            <button
              className={`px-6 py-3 font-medium ${
                activeTab === 'instructions'
                  ? 'text-primary-600 border-b-2 border-primary-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('instructions')}
            >
              Instructions
            </button>
          </div>
          
          <div className="mb-8">
            {activeTab === 'ingredients' ? (
              <>
                <div className="flex items-center mb-4">
                  <span className="text-gray-700 mr-4">Servings:</span>
                  <button
                    onClick={() => handleServingChange(-1)}
                    className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 text-gray-500 hover:bg-gray-100"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="mx-4 font-medium">{servings}</span>
                  <button
                    onClick={() => handleServingChange(1)}
                    className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 text-gray-500 hover:bg-gray-100"
                  >
                    <Plus size={16} />
                  </button>
                </div>
                
                <ul className="space-y-3">
                  {recipe.ingredients.map((ingredient, index) => (
                    <li key={index} className="flex items-start">
                      <div className="w-16 font-medium text-gray-800">
                        {getAdjustedAmount(ingredient.amount)} {ingredient.unit}
                      </div>
                      <div className="flex-1 text-gray-700">{ingredient.name}</div>
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <ol className="space-y-6">
                {recipe.instructions.map((step, index) => (
                  <li key={index} className="flex">
                    <div className="mr-4 flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-primary-100 text-primary-800 font-bold">
                      {index + 1}
                    </div>
                    <p className="text-gray-700">{step}</p>
                  </li>
                ))}
              </ol>
            )}
          </div>
          
          {recipe.notes && (
            <div className="bg-gray-50 border-l-4 border-primary-500 p-4 rounded-r-md mb-8">
              <h3 className="font-medium text-gray-900 mb-2">Chef's Notes</h3>
              <p className="text-gray-700">{recipe.notes}</p>
            </div>
          )}
          
          {/* Comments section would go here */}
        </div>
        
        <div className="lg:col-span-1">
          <div className="sticky top-6">
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <div className="flex flex-col space-y-3">
                {isAuthenticated ? (
                  <>
                    <button className="flex items-center justify-center space-x-2 bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-md transition-colors duration-200">
                      <Bookmark size={18} />
                      <span>Save Recipe</span>
                    </button>
                    <button className="flex items-center justify-center space-x-2 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-md transition-colors duration-200">
                      <Plus size={18} />
                      <span>Add to Meal Plan</span>
                    </button>
                  </>
                ) : (
                  <Link 
                    to="/login" 
                    className="flex items-center justify-center space-x-2 bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-md transition-colors duration-200"
                  >
                    <span>Log in to Save Recipe</span>
                  </Link>
                )}
                <button className="flex items-center justify-center space-x-2 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-md transition-colors duration-200">
                  <Printer size={18} />
                  <span>Print Recipe</span>
                </button>
                <button className="flex items-center justify-center space-x-2 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-md transition-colors duration-200">
                  <Share2 size={18} />
                  <span>Share Recipe</span>
                </button>
              </div>
            </div>
            
            {recipe.nutrition && (
              <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h3 className="font-serif font-bold text-lg text-gray-900 mb-4">Nutrition Information</h3>
                <div className="space-y-3">
                  {Object.entries(recipe.nutrition).map(([key, value]) => (
                    <div key={key} className="flex justify-between border-b border-gray-100 pb-2">
                      <span className="text-gray-600 capitalize">{key}</span>
                      <span className="font-medium text-gray-800">{value}</span>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-gray-500 mt-4">
                  *Percent Daily Values are based on a 2,000 calorie diet
                </p>
              </div>
            )}
            
            {recipe.tags && recipe.tags.length > 0 && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="font-serif font-bold text-lg text-gray-900 mb-4">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {recipe.tags.map((tag, index) => (
                    <Link
                      key={index}
                      to={`/recipes?tag=${encodeURIComponent(tag)}`}
                      className="px-3 py-1 bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-full text-sm transition-colors duration-200"
                    >
                      {tag}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;