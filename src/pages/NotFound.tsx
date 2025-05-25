import React from 'react';
import { Link } from 'react-router-dom';
import { ChefHat } from 'lucide-react';

const NotFound: React.FC = () => {
  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12 bg-gray-50">
      <div className="text-center">
        <div className="flex justify-center mb-4">
          <ChefHat className="h-16 w-16 text-primary-500" />
        </div>
        <h1 className="font-serif text-6xl font-bold text-gray-900 mb-4">404</h1>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Page Not Found</h2>
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          The recipe you're looking for might have been moved or doesn't exist.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-md transition-colors duration-200"
          >
            Go Home
          </Link>
          <Link
            to="/recipes"
            className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 px-6 py-3 rounded-md transition-colors duration-200"
          >
            Browse Recipes
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;