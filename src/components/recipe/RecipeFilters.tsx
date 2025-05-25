import React, { useState } from 'react';
import { Sliders, ChevronDown, ChevronUp } from 'lucide-react';

interface FiltersProps {
  onFilterChange: (filters: Record<string, any>) => void;
}

const categories = [
  'All', 'Breakfast', 'Lunch', 'Dinner', 'Dessert', 'Snacks', 
  'Vegetarian', 'Vegan', 'Gluten-Free', 'Quick & Easy'
];

const cookTimes = [
  { label: 'Any time', value: '' },
  { label: 'Under 15 minutes', value: '15' },
  { label: 'Under 30 minutes', value: '30' },
  { label: 'Under 45 minutes', value: '45' },
  { label: 'Under 60 minutes', value: '60' }
];

const RecipeFilters: React.FC<FiltersProps> = ({ onFilterChange }) => {
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedCookTime, setSelectedCookTime] = useState('');
  const [selectedRating, setSelectedRating] = useState(0);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    applyFilters(category, selectedCookTime, selectedRating);
  };

  const handleCookTimeChange = (time: string) => {
    setSelectedCookTime(time);
    applyFilters(selectedCategory, time, selectedRating);
  };

  const handleRatingChange = (rating: number) => {
    setSelectedRating(rating);
    applyFilters(selectedCategory, selectedCookTime, rating);
  };

  const applyFilters = (category: string, cookTime: string, rating: number) => {
    onFilterChange({
      category: category === 'All' ? '' : category,
      cookTime,
      rating
    });
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Sliders className="h-5 w-5 text-gray-500" />
          <h3 className="font-medium text-gray-800">Filters</h3>
        </div>
        <button 
          onClick={toggleFilters}
          className="text-gray-500 hover:text-primary-600 focus:outline-none"
        >
          {showFilters ? (
            <ChevronUp className="h-5 w-5" />
          ) : (
            <ChevronDown className="h-5 w-5" />
          )}
        </button>
      </div>
      
      {showFilters && (
        <div className="mt-4 animate-fade-in">
          <div className="mb-4">
            <h4 className="font-medium text-sm text-gray-700 mb-2">Categories</h4>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => handleCategoryChange(category)}
                  className={`px-3 py-1 text-sm rounded-full transition-colors duration-200 ${
                    selectedCategory === category
                      ? 'bg-primary-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
          
          <div className="mb-4">
            <h4 className="font-medium text-sm text-gray-700 mb-2">Cook Time</h4>
            <div className="flex flex-wrap gap-2">
              {cookTimes.map((time) => (
                <button
                  key={time.value}
                  onClick={() => handleCookTimeChange(time.value)}
                  className={`px-3 py-1 text-sm rounded-full transition-colors duration-200 ${
                    selectedCookTime === time.value
                      ? 'bg-primary-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {time.label}
                </button>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="font-medium text-sm text-gray-700 mb-2">Minimum Rating</h4>
            <div className="flex items-center space-x-2">
              {[1, 2, 3, 4, 5].map((rating) => (
                <button
                  key={rating}
                  onClick={() => handleRatingChange(rating)}
                  className="focus:outline-none"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill={rating <= selectedRating ? 'currentColor' : 'none'}
                    stroke="currentColor"
                    className={`w-6 h-6 ${
                      rating <= selectedRating
                        ? 'text-accent-500'
                        : 'text-gray-300'
                    }`}
                    strokeWidth={rating <= selectedRating ? '0' : '1.5'}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                  </svg>
                </button>
              ))}
              {selectedRating > 0 && (
                <button
                  onClick={() => handleRatingChange(0)}
                  className="text-xs text-gray-500 hover:text-gray-700 ml-2"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecipeFilters;