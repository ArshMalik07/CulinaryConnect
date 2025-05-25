import React, { useState, useEffect } from 'react';
import { addDays, format, startOfWeek, isSameDay } from 'date-fns';
import { Calendar, ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Recipe } from '../types/recipe';
import { fetchUserMealPlan, addToMealPlan, removeFromMealPlan } from '../services/mealPlanService';

interface MealPlanItem {
  id: string;
  date: string;
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  recipe: Recipe;
}

const MealPlanner: React.FC = () => {
  const { isAuthenticated, user } = useAuth();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [mealPlan, setMealPlan] = useState<MealPlanItem[]>([]);
  const [loading, setLoading] = useState(true);
  
  const startDate = startOfWeek(currentDate, { weekStartsOn: 1 });
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(startDate, i));
  
  useEffect(() => {
    const loadMealPlan = async () => {
      if (!isAuthenticated) return;
      
      try {
        setLoading(true);
        const data = await fetchUserMealPlan(user?.id || '');
        setMealPlan(data);
      } catch (error) {
        console.error('Error loading meal plan:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadMealPlan();
  }, [isAuthenticated, user]);

  const getMealsByDay = (date: Date, mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack') => {
    const dateStr = format(date, 'yyyy-MM-dd');
    return mealPlan.filter(
      item => item.date === dateStr && item.mealType === mealType
    );
  };

  const handleRemoveMeal = async (itemId: string) => {
    try {
      await removeFromMealPlan(itemId);
      setMealPlan(mealPlan.filter(item => item.id !== itemId));
    } catch (error) {
      console.error('Error removing meal:', error);
    }
  };

  const navigateWeek = (direction: 'prev' | 'next') => {
    const newDate = direction === 'prev' 
      ? addDays(currentDate, -7) 
      : addDays(currentDate, 7);
    setCurrentDate(newDate);
  };

  if (!isAuthenticated) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Login Required</h2>
          <p className="text-gray-600 mb-6">
            Please log in to access your meal planner.
          </p>
          <Link 
            to="/login" 
            className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg transition-colors duration-200"
          >
            Log In
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-serif text-3xl md:text-4xl font-bold text-gray-900">
          Meal Planner
        </h1>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => navigateWeek('prev')}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
          >
            <ChevronLeft className="h-5 w-5 text-gray-600" />
          </button>
          <div className="flex items-center space-x-2">
            <Calendar className="h-5 w-5 text-primary-600" />
            <span className="font-medium">
              {format(startDate, 'MMM d')} - {format(addDays(startDate, 6), 'MMM d, yyyy')}
            </span>
          </div>
          <button
            onClick={() => navigateWeek('next')}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
          >
            <ChevronRight className="h-5 w-5 text-gray-600" />
          </button>
        </div>
      </div>
      
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="w-24 bg-gray-50 px-4 py-2 border"></th>
                {weekDays.map((day) => (
                  <th 
                    key={format(day, 'yyyy-MM-dd')}
                    className={`px-4 py-3 text-center border ${
                      isSameDay(day, new Date()) ? 'bg-primary-50' : 'bg-gray-50'
                    }`}
                  >
                    <div className="font-medium">{format(day, 'EEE')}</div>
                    <div className={`text-sm ${
                      isSameDay(day, new Date()) ? 'text-primary-700' : 'text-gray-500'
                    }`}>
                      {format(day, 'MMM d')}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {['breakfast', 'lunch', 'dinner', 'snack'].map((mealType) => (
                <tr key={mealType}>
                  <td className="px-4 py-2 font-medium border bg-gray-50 capitalize">
                    {mealType}
                  </td>
                  {weekDays.map((day) => {
                    const meals = getMealsByDay(day, mealType as any);
                    return (
                      <td 
                        key={`${mealType}-${format(day, 'yyyy-MM-dd')}`}
                        className="p-2 border h-32 align-top"
                      >
                        {meals.length > 0 ? (
                          <div className="space-y-2">
                            {meals.map((meal) => (
                              <div 
                                key={meal.id}
                                className="group bg-white rounded-md shadow-sm border border-gray-200 p-2 relative"
                              >
                                <div className="flex items-start">
                                  {meal.recipe.image && (
                                    <img 
                                      src={meal.recipe.image} 
                                      alt={meal.recipe.title}
                                      className="w-12 h-12 object-cover rounded-md mr-2 flex-shrink-0"
                                    />
                                  )}
                                  <div className="flex-1 min-w-0">
                                    <Link 
                                      to={`/recipes/${meal.recipe.id}`}
                                      className="block font-medium text-sm text-gray-900 hover:text-primary-600 truncate"
                                    >
                                      {meal.recipe.title}
                                    </Link>
                                    <div className="text-xs text-gray-500 mt-1">
                                      {meal.recipe.cookTime} min
                                    </div>
                                  </div>
                                </div>
                                <button
                                  onClick={() => handleRemoveMeal(meal.id)}
                                  className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded-full hover:bg-gray-100"
                                >
                                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500">
                                    <path d="M18 6L6 18M6 6l12 12"></path>
                                  </svg>
                                </button>
                              </div>
                            ))}
                          </div>
                        ) : null}
                        <Link 
                          to={`/recipes?planForDate=${format(day, 'yyyy-MM-dd')}&mealType=${mealType}`}
                          className="flex items-center justify-center space-x-1 text-xs text-gray-500 hover:text-primary-600 mt-2 p-1 rounded-md hover:bg-gray-50 transition-colors"
                        >
                          <Plus size={14} />
                          <span>Add meal</span>
                        </Link>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MealPlanner;