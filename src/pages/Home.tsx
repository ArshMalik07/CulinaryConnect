import React, { useState, useEffect } from 'react';
import { ArrowRight, Search } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import RecipeGrid from '../components/recipe/RecipeGrid';
import { Recipe } from '../types/recipe';
import { fetchFeaturedRecipes, fetchPopularCategories } from '../services/recipeService';

const Home: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [featuredRecipes, setFeaturedRecipes] = useState<Recipe[]>([]);
  const [categories, setCategories] = useState<{id: string, name: string, image: string}[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const loadData = async () => {
      try {
        const recipesData = await fetchFeaturedRecipes();
        const categoriesData = await fetchPopularCategories();
        
        setFeaturedRecipes(recipesData);
        setCategories(categoriesData);
      } catch (error) {
        console.error('Error loading home data:', error);
      }
    };
    
    loadData();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/recipes?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[500px] bg-gradient-to-r from-primary-900 to-primary-700 flex items-center">
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/1640773/pexels-photo-1640773.jpeg?auto=compress&cs=tinysrgb&w=1600')] bg-cover bg-center mix-blend-overlay"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
          <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4 animate-slide-up">
            Discover, Cook, Share
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-xl animate-slide-up" style={{ animationDelay: '100ms' }}>
            Find inspiration for your next meal with thousands of delicious recipes
          </p>
          
          <form onSubmit={handleSearch} className="flex max-w-md animate-slide-up" style={{ animationDelay: '200ms' }}>
            <div className="relative flex-grow">
              <input
                type="text"
                placeholder="Search for recipes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-800"
              />
              <Search className="absolute left-3 top-3.5 h-5 w-5 text-gray-500" />
            </div>
            <button
              type="submit"
              className="bg-accent-500 hover:bg-accent-600 text-white px-6 py-3 rounded-r-lg transition-colors duration-200"
            >
              Search
            </button>
          </form>
        </div>
      </section>
      
      {/* Featured Recipes */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="font-serif text-3xl font-bold text-gray-900">Featured Recipes</h2>
            <Link
              to="/recipes"
              className="flex items-center text-primary-600 hover:text-primary-700 font-medium transition-colors duration-200"
            >
              <span>View all</span>
              <ArrowRight className="ml-1 h-5 w-5" />
            </Link>
          </div>
          
          <RecipeGrid recipes={featuredRecipes} />
        </div>
      </section>
      
      {/* Popular Categories */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-3xl font-bold text-gray-900 mb-8 text-center">
            Popular Categories
          </h2>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {categories.map((category) => (
              <Link
                key={category.id}
                to={`/recipes?category=${encodeURIComponent(category.name)}`}
                className="group"
              >
                <div className="relative h-36 rounded-lg overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                  <h3 className="absolute bottom-3 left-0 right-0 text-center text-white font-medium">
                    {category.name}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      
      {/* Newsletter */}
      <section className="py-16 bg-primary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-3xl font-bold text-gray-900 mb-4">
            Never Miss a Recipe
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">
            Subscribe to our newsletter and get weekly recipe inspirations, cooking tips, and seasonal ideas.
          </p>
          
          <form className="flex flex-col sm:flex-row max-w-md mx-auto sm:max-w-lg">
            <input
              type="email"
              placeholder="Your email address"
              className="px-4 py-3 rounded-lg sm:rounded-r-none mb-2 sm:mb-0 focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-800 w-full"
            />
            <button
              type="submit"
              className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg sm:rounded-l-none transition-colors duration-200"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Home;