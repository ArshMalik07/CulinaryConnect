import React from 'react';
import { Link } from 'react-router-dom';
import { ChefHat, Instagram, Twitter, Facebook, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <ChefHat className="h-8 w-8 text-primary-500" />
              <span className="font-serif font-bold text-xl">CulinaryConnect</span>
            </Link>
            <p className="text-gray-400 mb-4">
              Share recipes, plan meals, and connect with fellow food enthusiasts.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                <Mail size={20} />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div className="col-span-1">
            <h3 className="font-medium text-lg mb-4">Explore</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/recipes" className="text-gray-400 hover:text-white transition-colors duration-200">
                  Recipes
                </Link>
              </li>
              <li>
                <Link to="/meal-planner" className="text-gray-400 hover:text-white transition-colors duration-200">
                  Meal Planner
                </Link>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                  Popular Chefs
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                  Seasonal Specials
                </a>
              </li>
            </ul>
          </div>
          
          {/* Categories */}
          <div className="col-span-1">
            <h3 className="font-medium text-lg mb-4">Categories</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                  Breakfast
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                  Main Dishes
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                  Desserts
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                  Vegetarian
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                  Quick & Easy
                </a>
              </li>
            </ul>
          </div>
          
          {/* Support */}
          <div className="col-span-1">
            <h3 className="font-medium text-lg mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8">
          <p className="text-center text-gray-500">
            © {new Date().getFullYear()} CulinaryConnect. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;