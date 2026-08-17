import { Meal, Area, Category, Product } from "./entity.js";

const baseURL = "https://nutriplan-api.vercel.app/api";

let meals,
  areas,
  categories,
  filteredMeals = [];

let meal = {};

export class getData {
  // ALL MEALS
  async getMeals(value, page, limit) {
    try {
      const response = await fetch(
        `${baseURL}/meals/search?q=${value}&page=${page}&limit=${limit}`,
      );
      if (!response.ok) {
        throw new Error(
          `Error is ${response.status} ,, ${response.statusText}`,
        );
      }
      const payload = await response.json();

      if (payload.message === "success") {
        meals = payload.results.map((meal) => new Meal(meal));
        return meals;
      }

      return [];
    } catch (error) {
      console.error(error);
    }
  }

  // GET NUTRITION DATA
  async getNutrition(meal) {
    try {
      const response = await fetch(`${baseURL}/nutrition/analyze`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": "i0jafOLVf6C7Vhv25GSyPE70JF1596PieQYxWOU3",
        },
        body: JSON.stringify({
          recipeName: meal.name,
          ingredients: meal.ingredients.map(
            (item) => `${item.measure} ${item.ingredient}`,
          ),
        }),
      });

      if (!response.ok) {
        throw new Error(
          `Error is ${response.status} ,, ${response.statusText}`,
        );
      }

      const payload = await response.json();

      return payload.data;
    } catch (error) {
      console.error("NUTRITION ERROR:", error);
      return null;
    }
  }

  // GET To Render 10 Areas
  async getFilterData(filtered) {
    try {
      const response = await fetch(`${baseURL}/meals/${filtered}`);
      if (!response.ok)
        throw new Error(`Error is ${response.ok} ,, ${response.statusText}`);

      const payload = await response.json();
      areas = payload.results.map((area) => new Area(area));
      return areas.splice(0, 10);
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  // GET TO RENDER ALL CATS
  async getFilterCat(filtered) {
    try {
      const response = await fetch(`${baseURL}/meals/${filtered}`);
      if (!response.ok)
        throw new Error(`Error is ${response.ok} ,, ${response.statusText}`);

      const payload = await response.json();
      categories = payload.results.map((category) => new Category(category));
      return categories.splice(0, 12);
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  // LOGIC TO RENDER FILTERS
  async gitFilterMeals(filteredType, value, page, limit) {
    try {
      const response = await fetch(
        `${baseURL}/meals/filter?${filteredType}=${value}&page=${page}&limit=${limit}`,
      );
      if (!response.ok)
        throw new Error(`Error is ${response.ok} ,, ${response.statusText}`);

      const payload = await response.json();
      filteredMeals = payload.results.map((filterMeal) => new Meal(filterMeal));
      return filteredMeals;
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  // GET MEAL
  async getMealById(id) {
    try {
      const response = await fetch(`${baseURL}/meals/${id}`);
      if (!response.ok)
        throw new Error(`Error is ${response.ok} ,, ${response.statusText}`);

      const payload = await response.json();
      meal = new Meal(payload.result);
      return meal;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  // ! PRODUCTS !
  // SEARCH PRODUCTS
  async getProducts(value, page, limit) {
    try {
      const response = await fetch(
        `${baseURL}/products/search?q=${value}&page=${page}&limit=${limit}`,
      );

      if (!response.ok) {
        throw new Error(
          `Error is ${response.status} ,, ${response.statusText}`,
        );
      }

      const payload = await response.json();

      return (payload.results || []).map((item) => new Product(item));
    } catch (error) {
      console.error("PRODUCT SEARCH ERROR:", error);
      return [];
    }
  }

  // GET PRODUCT BY BARCODE
  async getProductByBarcode(barcode) {
    try {
      const response = await fetch(`${baseURL}/products/barcode/${barcode}`);

      if (!response.ok) {
        throw new Error(
          `Error is ${response.status} ,, ${response.statusText}`,
        );
      }

      const payload = await response.json();

      return payload.result ? new Product(payload.result) : null;
    } catch (error) {
      console.error("BARCODE ERROR:", error);
      return null;
    }
  }

  // GET PRODUCT CATEGORIES
  async getProductCategories() {
    try {
      const response = await fetch(`${baseURL}/products/categories`);

      if (!response.ok) {
        throw new Error(
          `Error is ${response.status} ,, ${response.statusText}`,
        );
      }

      const payload = await response.json();

      return payload.results.splice(0, 12) || [];
    } catch (error) {
      console.error("PRODUCT CATEGORIES ERROR:", error);
      return [];
    }
  }

  // GET PRODUCTS BY CATEGORY
  async getProductsByCategory(category) {
    try {
      const response = await fetch(`${baseURL}/products/category/${category}`);

      if (!response.ok) {
        throw new Error(
          `Error is ${response.status} ,, ${response.statusText}`,
        );
      }

      const payload = await response.json();

      return (payload.results || []).map((item) => new Product(item));
    } catch (error) {
      console.error("PRODUCT CATEGORY ERROR:", error);
      return [];
    }
  }
}
