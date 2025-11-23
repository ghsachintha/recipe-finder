const BASE_URL = "https://www.themealdb.com/api/json/v1/1";

export const recipeAPI = {
  searchByName: async (query) => {
    const res = await fetch(`${BASE_URL}/search.php?s=${query}`);
    const data = await res.json();
    return data.meals || [];
  },

  searchByIngredient: async (ingredient) => {
    const res = await fetch(`${BASE_URL}/filter.php?i=${ingredient}`);
    const data = await res.json();
    return data.meals || [];
  },

  getRecipeById: async (id) => {
    const res = await fetch(`${BASE_URL}/lookup.php?i=${id}`);
    const data = await res.json();
    return data.meals ? data.meals[0] : null;
  },

  getRandomRecipe: async () => {
    const res = await fetch(`${BASE_URL}/random.php`);
    const data = await res.json();
    return data.meals || [];
  },

  getByCategory: async (category) => {
    const res = await fetch(`${BASE_URL}/filter.php?c=${category}`);
    const data = await res.json();
    return data.meals || [];
  },
};
