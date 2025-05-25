from flask import Flask, jsonify, request
from flask_cors import CORS
import os
import json
from datetime import datetime

app = Flask(__name__)
CORS(app)

# Placeholder for database
recipes_file = os.path.join(os.path.dirname(__file__), 'data', 'recipes.json')
users_file = os.path.join(os.path.dirname(__file__), 'data', 'users.json')
meal_plans_file = os.path.join(os.path.dirname(__file__), 'data', 'meal_plans.json')

# Ensure data directory exists
os.makedirs(os.path.join(os.path.dirname(__file__), 'data'), exist_ok=True)

# Helper functions to read/write JSON data
def read_json(file_path):
    if not os.path.exists(file_path):
        return []
    with open(file_path, 'r') as f:
        return json.load(f)

def write_json(file_path, data):
    with open(file_path, 'w') as f:
        json.dump(data, f, indent=2)

# Routes
@app.route('/api/recipes', methods=['GET'])
def get_recipes():
    recipes = read_json(recipes_file)
    
    # Filter based on query parameters
    search = request.args.get('search')
    category = request.args.get('category')
    cook_time = request.args.get('cookTime')
    rating = request.args.get('rating')
    
    if search:
        search = search.lower()
        recipes = [r for r in recipes if search in r['title'].lower() or search in r['description'].lower()]
    
    if category:
        recipes = [r for r in recipes if r.get('category') == category]
    
    if cook_time:
        cook_time = int(cook_time)
        recipes = [r for r in recipes if r.get('cookTime', 0) <= cook_time]
    
    if rating:
        rating = float(rating)
        recipes = [r for r in recipes if r.get('rating', 0) >= rating]
        
    return jsonify(recipes)

@app.route('/api/recipes/<recipe_id>', methods=['GET'])
def get_recipe(recipe_id):
    recipes = read_json(recipes_file)
    recipe = next((r for r in recipes if r['id'] == recipe_id), None)
    
    if recipe:
        return jsonify(recipe)
    else:
        return jsonify({"error": "Recipe not found"}), 404

@app.route('/api/recipes', methods=['POST'])
def create_recipe():
    if not request.json:
        return jsonify({"error": "Invalid request"}), 400
    
    recipes = read_json(recipes_file)
    
    new_recipe = request.json
    new_recipe['id'] = str(len(recipes) + 1)
    new_recipe['createdAt'] = datetime.now().isoformat()
    new_recipe['updatedAt'] = datetime.now().isoformat()
    
    recipes.append(new_recipe)
    write_json(recipes_file, recipes)
    
    return jsonify(new_recipe), 201

@app.route('/api/auth/register', methods=['POST'])
def register():
    if not request.json or not all(k in request.json for k in ('name', 'email', 'password')):
        return jsonify({"error": "Invalid request"}), 400
    
    users = read_json(users_file)
    
    # Check if email already exists
    if any(u['email'] == request.json['email'] for u in users):
        return jsonify({"error": "Email already registered"}), 400
    
    new_user = {
        "id": str(len(users) + 1),
        "name": request.json['name'],
        "email": request.json['email'],
        # In a real app, password should be hashed
        "password": request.json['password']
    }
    
    users.append(new_user)
    write_json(users_file, users)
    
    # Return user without password
    user_response = {k: v for k, v in new_user.items() if k != 'password'}
    return jsonify(user_response), 201

@app.route('/api/auth/login', methods=['POST'])
def login():
    if not request.json or not all(k in request.json for k in ('email', 'password')):
        return jsonify({"error": "Invalid request"}), 400
    
    users = read_json(users_file)
    
    # Find user by email and password
    user = next((u for u in users if u['email'] == request.json['email'] and u['password'] == request.json['password']), None)
    
    if user:
        # Return user without password
        user_response = {k: v for k, v in user.items() if k != 'password'}
        return jsonify(user_response)
    else:
        return jsonify({"error": "Invalid credentials"}), 401

@app.route('/api/meal-plans/<user_id>', methods=['GET'])
def get_meal_plans(user_id):
    meal_plans = read_json(meal_plans_file)
    user_meal_plans = [mp for mp in meal_plans if mp.get('userId') == user_id]
    return jsonify(user_meal_plans)

@app.route('/api/meal-plans', methods=['POST'])
def add_meal_plan():
    if not request.json or not all(k in request.json for k in ('userId', 'recipeId', 'date', 'mealType')):
        return jsonify({"error": "Invalid request"}), 400
    
    meal_plans = read_json(meal_plans_file)
    recipes = read_json(recipes_file)
    
    recipe = next((r for r in recipes if r['id'] == request.json['recipeId']), None)
    if not recipe:
        return jsonify({"error": "Recipe not found"}), 404
    
    new_meal_plan = {
        "id": str(len(meal_plans) + 1),
        "userId": request.json['userId'],
        "date": request.json['date'],
        "mealType": request.json['mealType'],
        "recipe": recipe
    }
    
    meal_plans.append(new_meal_plan)
    write_json(meal_plans_file, meal_plans)
    
    return jsonify(new_meal_plan), 201

@app.route('/api/meal-plans/<item_id>', methods=['DELETE'])
def remove_meal_plan(item_id):
    meal_plans = read_json(meal_plans_file)
    filtered_meal_plans = [mp for mp in meal_plans if mp['id'] != item_id]
    
    if len(filtered_meal_plans) < len(meal_plans):
        write_json(meal_plans_file, filtered_meal_plans)
        return jsonify({"message": "Meal plan removed successfully"})
    else:
        return jsonify({"error": "Meal plan not found"}), 404

@app.route('/api/user/recipes/<user_id>', methods=['GET'])
def get_user_recipes(user_id):
    recipes = read_json(recipes_file)
    # In a real app, you would filter recipes by user ID
    # For demo purposes, return a subset of recipes
    user_recipes = recipes[:2] if recipes else []
    return jsonify(user_recipes)

@app.route('/api/user/favorites/<user_id>', methods=['GET'])
def get_user_favorites(user_id):
    recipes = read_json(recipes_file)
    # In a real app, you would have a favorites table
    # For demo purposes, return a subset of recipes
    favorites = recipes[2:5] if len(recipes) >= 5 else []
    return jsonify(favorites)

if __name__ == '__main__':
    # Load initial mock data if files don't exist
    if not os.path.exists(recipes_file):
        # Copy the mock data from the frontend
        from mock_data import MOCK_RECIPES
        write_json(recipes_file, MOCK_RECIPES)
    
    if not os.path.exists(users_file):
        # Initialize with a test user
        initial_users = [
            {
                "id": "1",
                "name": "John Doe",
                "email": "user@example.com",
                "password": "password"
            }
        ]
        write_json(users_file, initial_users)
    
    if not os.path.exists(meal_plans_file):
        write_json(meal_plans_file, [])
    
    app.run(debug=True)