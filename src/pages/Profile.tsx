import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChefHat, Grid, ClipboardList, Settings, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import RecipeGrid from '../components/recipe/RecipeGrid';
import { Recipe } from '../types/recipe';
import { fetchUserRecipes, fetchUserFavorites } from '../services/recipeService';

const Profile: React.FC = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'recipes' | 'favorites' | 'settings'>('recipes');
  const [userRecipes, setUserRecipes] = useState<Recipe[]>([]);
  const [userFavorites, setUserFavorites] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    
    const loadUserData = async () => {
      try {
        setLoading(true);
        
        if (activeTab === 'recipes') {
          const recipes = await fetchUserRecipes(user?.id || '');
          setUserRecipes(recipes);
        } else if (activeTab === 'favorites') {
          const favorites = await fetchUserFavorites(user?.id || '');
          setUserFavorites(favorites);
        }
      } catch (error) {
        console.error('Error loading user data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadUserData();
  }, [isAuthenticated, user, activeTab, navigate]);
  
  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {isAuthenticated && user && (
        <>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-10">
            <div className="flex items-center">
              <div className="bg-primary-100 p-4 rounded-full">
                <ChefHat className="h-12 w-12 text-primary-600" />
              </div>
              <div className="ml-4">
                <h1 className="font-serif text-3xl md:text-4xl font-bold text-gray-900">
                  {user.name}
                </h1>
                <p className="text-gray-600">{user.email}</p>
              </div>
            </div>
            
            <button
              onClick={handleLogout}
              className="flex items-center mt-4 md:mt-0 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors duration-200"
            >
              <LogOut className="h-5 w-5 mr-2" />
              <span>Logout</span>
            </button>
          </div>
          
          <div className="flex flex-wrap gap-4 border-b border-gray-200 mb-8">
            <button
              className={`flex items-center pb-4 px-1 ${
                activeTab === 'recipes'
                  ? 'text-primary-600 border-b-2 border-primary-600 font-medium'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('recipes')}
            >
              <Grid className="h-5 w-5 mr-2" />
              <span>My Recipes</span>
            </button>
            
            <button
              className={`flex items-center pb-4 px-1 ${
                activeTab === 'favorites'
                  ? 'text-primary-600 border-b-2 border-primary-600 font-medium'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('favorites')}
            >
              <ClipboardList className="h-5 w-5 mr-2" />
              <span>Favorites</span>
            </button>
            
            <button
              className={`flex items-center pb-4 px-1 ${
                activeTab === 'settings'
                  ? 'text-primary-600 border-b-2 border-primary-600 font-medium'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('settings')}
            >
              <Settings className="h-5 w-5 mr-2" />
              <span>Settings</span>
            </button>
          </div>
          
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
            </div>
          ) : (
            <>
              {activeTab === 'recipes' && (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="font-serif text-2xl font-bold text-gray-900">
                      My Recipes
                    </h2>
                    <button className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-md transition-colors duration-200">
                      Add New Recipe
                    </button>
                  </div>
                  
                  {userRecipes.length === 0 ? (
                    <div className="text-center py-12 bg-white rounded-lg shadow-sm">
                      <ChefHat className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-xl font-medium text-gray-900 mb-2">No recipes yet</h3>
                      <p className="text-gray-600 mb-6">
                        Start creating your first recipe to share with the community.
                      </p>
                      <button className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-md transition-colors duration-200">
                        Create Recipe
                      </button>
                    </div>
                  ) : (
                    <RecipeGrid recipes={userRecipes} />
                  )}
                </div>
              )}
              
              {activeTab === 'favorites' && (
                <div>
                  <h2 className="font-serif text-2xl font-bold text-gray-900 mb-6">
                    Favorite Recipes
                  </h2>
                  
                  {userFavorites.length === 0 ? (
                    <div className="text-center py-12 bg-white rounded-lg shadow-sm">
                      <ClipboardList className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-xl font-medium text-gray-900 mb-2">No favorites yet</h3>
                      <p className="text-gray-600 mb-6">
                        Browse recipes and add them to your favorites for quick access.
                      </p>
                      <button 
                        onClick={() => navigate('/recipes')}
                        className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-md transition-colors duration-200"
                      >
                        Browse Recipes
                      </button>
                    </div>
                  ) : (
                    <RecipeGrid recipes={userFavorites} />
                  )}
                </div>
              )}
              
              {activeTab === 'settings' && (
                <div>
                  <h2 className="font-serif text-2xl font-bold text-gray-900 mb-6">
                    Account Settings
                  </h2>
                  
                  <div className="bg-white rounded-lg shadow-md p-6">
                    <form className="space-y-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                          Full name
                        </label>
                        <input
                          id="name"
                          name="name"
                          type="text"
                          defaultValue={user.name}
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                          Email address
                        </label>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          defaultValue={user.email}
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
                          Bio
                        </label>
                        <textarea
                          id="bio"
                          name="bio"
                          rows={4}
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                          placeholder="Tell us about yourself and your cooking style..."
                        ></textarea>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-medium text-gray-900 mb-3">Preferences</h3>
                        <div className="space-y-4">
                          <div className="flex items-center">
                            <input
                              id="newsletter"
                              name="newsletter"
                              type="checkbox"
                              defaultChecked
                              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                            />
                            <label htmlFor="newsletter" className="ml-2 block text-sm text-gray-700">
                              Receive weekly newsletter with recipe inspirations
                            </label>
                          </div>
                          
                          <div className="flex items-center">
                            <input
                              id="notifications"
                              name="notifications"
                              type="checkbox"
                              defaultChecked
                              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                            />
                            <label htmlFor="notifications" className="ml-2 block text-sm text-gray-700">
                              Receive notifications when someone comments on your recipes
                            </label>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex justify-end">
                        <button
                          type="submit"
                          className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-md transition-colors duration-200"
                        >
                          Save Changes
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Profile;