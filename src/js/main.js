import { getData } from "./ui/ApiService.js";
import { showPage } from "./ui/router.js";

import {
  MealUI,
  AreaUI,
  CategoryUI,
  LoadingUI,
  MealDetailsUI,
  FoodLogUI,
  LogMealModalUI,
  ProductUI,
  ProductModalUI,
  CatScanUI,
} from "./ui/UI.js";

let currentMeal = null;
let currentProducts = [];
let currentProductGrade = "";

// ^ START OF ELEMENTS
const recipes = document.getElementById("recipes-grid");
const categories = document.getElementById("categories-grid");
const areaFilter = document.querySelector(
  "#search-filters-section .overflow-x-auto",
);
const recipesCount = document.getElementById("recipes-count");
const searchInput = document.getElementById("search-input");
const backToMealsBtn = document.getElementById("back-to-meals-btn");
const appLoadingOverlay = document.getElementById("app-loading-overlay");
const logMealBtn = document.getElementById("log-meal-btn");
const foodLogSection = document.querySelector(
  ".nav-link[data-page=foodlogSection]",
);
const loggedItemsList = document.getElementById("logged-items-list");
const foodlogDate = document.getElementById("foodlog-date");
const clearFoodlog = document.getElementById("clear-foodlog");

const productsGrid = document.getElementById("products-grid");
const searchProductBtn = document.getElementById("search-product-btn");
const productSearchInput = document.getElementById("product-search-input");
const lookupBarcodeBtn = document.getElementById("lookup-barcode-btn");
const barcodeInput = document.getElementById("barcode-input");
const productCategories = document.getElementById("product-categories");
const productsCount = document.getElementById("products-count");
const nutriScoreFilters = document.querySelectorAll(".nutri-score-filter");
const categoriesContainer = document.getElementById("product-categories");
const listViewBtn = document.getElementById("list-view-btn");
const gridViewBtn = document.getElementById("grid-view-btn");
// ! END OF ELEMENTS !
// ^ START OF INSTANCES ^
const mainMeal = new getData();
const meals = new MealUI(recipes);
const areas = new AreaUI(areaFilter);
const categoes = new CategoryUI(categories);
const loading = new LoadingUI(appLoadingOverlay);
const mealDetail = new MealDetailsUI();
const foodLogUi = new FoodLogUI();
const logMealModal = new LogMealModalUI();
const products = new ProductUI(productsGrid);
const productModal = new ProductModalUI();
const catScanUI = new CatScanUI(categoriesContainer);
// ! END OF INSTANCES !

// LIST OF FOOD LOG >>>>>>>
let foodLog = JSON.parse(localStorage.getItem("foodLog")) || [];
// ^ HELPER FUNCTIONS
function getToday() {
  return new Date().toDateString();
}
const today = getToday();

function calculateTodayTotals() {
  const todayLogs = foodLog.filter((item) => item.date === today);
  const totals = todayLogs.reduce(
    (acc, item) => {
      acc.calories += Number(item.calories) || 0;
      acc.protein += Number(item.protein) || 0;
      acc.carbs += Number(item.carbs) || 0;
      acc.fat += Number(item.fat) || 0;
      return acc;
    },
    { calories: 0, protein: 0, carbs: 0, fat: 0 },
  );
  return { todayLogs, totals };
}

function saveToLocalStorage() {
  localStorage.setItem("foodLog", JSON.stringify(foodLog));
}
function renderFoodLog() {
  const { todayLogs, totals } = calculateTodayTotals();
  foodLogUi.render(todayLogs, totals);
  foodLogUi.renderWeekly(foodLog);
  foodLogUi.renderQuickStats(foodLog);
  const options = { weekday: "long", month: "short", day: "numeric" };
  foodlogDate.textContent = new Date().toLocaleDateString("en-US", options);
}

function toggleCardsToView(view) {
  const isList = view === "list";
  document.querySelectorAll("#recipes-grid .recipe-card").forEach((card) => {
    card.classList.toggle("flex", isList);
    card.classList.toggle("flex-row", isList);
    card.classList.toggle("h-40", isList);

    const imageWrap = card.firstElementChild;
    if (imageWrap) {
      imageWrap.classList.toggle("w-48", isList);
      imageWrap.classList.toggle("shrink-0", isList);
      imageWrap.classList.toggle("h-full", isList);
      imageWrap.classList.toggle("h-48", !isList);

      const badgesOverlay = imageWrap.lastElementChild;
      if (badgesOverlay) badgesOverlay.classList.toggle("hidden", isList);
    }

    const contentWrap = card.lastElementChild;
    if (contentWrap && contentWrap !== imageWrap) {
      contentWrap.classList.toggle("flex-1", isList);
    }
  });
}

function setActiveToggleBtn(view) {
  const activeClasses = ["bg-white", "rounded-md", "shadow-sm"];
  const active = gridViewBtn.querySelector("i");
  const inactive = listViewBtn.querySelector("i");

  if (view === "grid") {
    gridViewBtn.classList.add(...activeClasses);
    listViewBtn.classList.remove(...activeClasses);
    gridViewBtn
      .querySelector("i")
      .classList.replace("text-gray-500", "text-gray-700");
    listViewBtn
      .querySelector("i")
      .classList.replace("text-gray-700", "text-gray-500");
  } else {
    listViewBtn.classList.add(...activeClasses);
    gridViewBtn.classList.remove(...activeClasses);
    listViewBtn
      .querySelector("i")
      .classList.replace("text-gray-500", "text-gray-700");
    gridViewBtn
      .querySelector("i")
      .classList.replace("text-gray-700", "text-gray-500");
  }
}

function switchView(view) {
  if (view === "list") {
    recipes.classList.remove("grid-cols-4", "gap-5");
    recipes.classList.add("grid-cols-2", "gap-4");
  } else {
    recipes.classList.remove("grid-cols-2", "gap-4");
    recipes.classList.add("grid-cols-4", "gap-5");
  }
  meals.setViewMode(view);
  toggleCardsToView(view);
  setActiveToggleBtn(view);
  if (typeof meals !== "undefined" && typeof meals.setViewMode === "function") {
    meals.setViewMode(view);
  }
  toggleCardsToView(view);
  setActiveToggleBtn(view);
}

export async function initMeals() {
  loading.render();
  showPage("home");
  products.emptyState();
  categoriesContainer.replaceChildren();
  const data = await mainMeal.getMeals("Chicken", 1, 25);
  recipesCount.textContent = `Showing ${data.length} recipes`;
  data.forEach((recipe) => {
    meals.render(recipe);
  });

  // AREA
  const filteredData = await mainMeal.getFilterData("areas");
  filteredData.forEach((filterData) => {
    areas.render(filterData);
  });

  // CAT
  try {
    const categoriesName = await mainMeal.getFilterCat("categories");
    categoriesName.forEach((cat) => {
      categoes.render(cat);
    });
    // PRODUCT CATEGORIES
    const categoriesBrand = await mainMeal.getProductCategories(
      "categoriesContainer",
    );
    const categories = categoriesBrand.results || categoriesBrand;
    categories.forEach((cat) => {
      catScanUI.render(cat);
    });
  } catch (error) {
    console.error("Error loading categories:", error);
  }

  loading.hide();

  // CAT PROD LISTENER
  categoriesContainer.addEventListener("click", async (e) => {
    let clicked = e.target.closest(".product-category-btn");
    if (!clicked) return;
    let nameCat = clicked.dataset.category;
    const loader = loading.reqLoading();
    recipes.append(loader);
    const dataFiltered = await mainMeal.getProductsByCategory(nameCat);
    loader.remove();
    products.clear();
    if (dataFiltered.length > 0) {
      currentProducts = dataFiltered;
      productsCount.textContent = `Showing ${dataFiltered.length} ${nameCat} recipes`;
      dataFiltered.forEach((mealsFilter) => {
        products.render(mealsFilter);
      });
    } else {
      currentProducts = [];
      productsCount.textContent = `No recipes found for ${nameCat}`;
      products.emptyState();
    }
  });

  gridViewBtn.addEventListener("click", () => switchView("grid"));
  listViewBtn.addEventListener("click", () => switchView("list"));

  // AREA FILTER LISTENER
  areaFilter.addEventListener("click", async (e) => {
    let clicked = e.target.closest("button");
    if (!clicked) return;
    let nameArea = clicked.textContent.trim();

    let activeBtn = areaFilter.querySelector(".bg-emerald-600");
    if (activeBtn === clicked) {
      return;
    }
    if (activeBtn) {
      activeBtn.classList.add(
        "bg-gray-100",
        "text-gray-700",
        "hover:bg-gray-200",
      );
      activeBtn.classList.remove(
        "bg-emerald-600",
        "text-white",
        "hover:bg-emerald-700",
      );
    }
    clicked.classList.remove(
      "bg-gray-100",
      "text-gray-700",
      "hover:bg-gray-200",
    );

    clicked.classList.add(
      "bg-emerald-600",
      "text-white",
      "hover:bg-emerald-700",
    );

    if (nameArea === "All Cuisines") {
      meals.clear();

      data.forEach((recipe) => {
        meals.render(recipe);
      });
      recipesCount.textContent = `Showing ${data.length} recipes`;
      return;
    } else {
      const loader = loading.reqLoading();

      recipes.append(loader);

      const dataFiltered = await mainMeal.gitFilterMeals(
        "area",
        nameArea,
        "1",
        "20",
      );

      loader.remove();

      if (dataFiltered.length === 0) {
        meals.clear();
        meals.emptyState();
        recipesCount.textContent = `No recipes found`;
      } else {
        meals.clear();
        recipesCount.textContent = `Showing ${dataFiltered.length} ${nameArea} recipes`;
        dataFiltered.forEach((mealsFilter) => {
          meals.render(mealsFilter);
        });
      }
    }
  });

  // CAT FILTER LISTENER
  categories.addEventListener("click", async (e) => {
    let clicked = e.target.closest(".category-card");
    if (!clicked) return;
    let nameCat = clicked.dataset.category;
    const loader = loading.reqLoading();
    recipes.append(loader);
    const dataFiltered = await mainMeal.gitFilterMeals(
      "category",
      nameCat,
      "1",
      "25",
    );
    loader.remove();
    meals.clear();
    if (dataFiltered.length > 0) {
      recipesCount.textContent = `Showing ${dataFiltered.length} ${nameCat} recipes`;
      dataFiltered.forEach((mealsFilter) => {
        meals.render(mealsFilter);
      });
    } else {
      recipesCount.textContent = `No recipes found for ${nameCat}`;
      meals.emptyState();
    }
  });

  // SEARCH LISTENER
  let timer;
  searchInput.addEventListener("input", (e) => {
    let searched = e.target.value.trim();
    clearTimeout(timer);
    timer = setTimeout(async () => {
      if (!searched) {
        meals.clear();
        recipesCount.textContent = `Showing ${data.length} recipes`;
        data.forEach((recipe) => {
          meals.render(recipe);
        });
        return;
      }

      meals.clear();

      const loader = loading.reqLoading();
      recipes.append(loader);

      const searchResult = await mainMeal.getMeals(searched, "1", "25");

      loader.remove();

      if (searchResult.length === 0) {
        meals.emptyState();
        recipesCount.textContent = `No recipes found for ${searched}`;
      } else {
        recipesCount.textContent = `Showing ${searchResult.length} recipes for "${searched}"`;

        searchResult.forEach((res) => {
          meals.render(res);
        });
      }
    }, 500);
  });

  // ^ IMP  <<<<<<< MEAL + MEAL DETAILS LISTENER  ^
  recipes.addEventListener("click", async (e) => {
    let clicked = e.target.closest(".recipe-card");
    if (!clicked) return;
    let id = clicked.dataset.mealId;

    mealDetail.setLoading(true);
    const meal = await mainMeal.getMealById(id);
    if (!meal) {
      mealDetail.setLoading(false);
      return;
    }

    currentMeal = meal;
    mealDetail.render(meal);

    mealDetail.renderNutritionLoading();

    showPage("mealDetails");
    window.scrollTo({ top: 0, behavior: "smooth" });

    const nutrition = await mainMeal.getNutrition(meal);

    if (nutrition) {
      meal.perServing = nutrition.perServing;
      meal.totals = nutrition.totals;
      meal.servings = nutrition.servings;

      mealDetail.renderNutrition(meal);
      mealDetail.updateNutrition(meal);
    }

    mealDetail.setLoading(false);
  });

  backToMealsBtn.addEventListener("click", () => {
    showPage("home");
  });

  // ! PRODUCT SCANNER !
  productsGrid.addEventListener("click", (e) => {
    const card = e.target.closest(".product-card");
    if (!card) return;
    const barcode = card.dataset.barcode;
    const product = currentProducts.find(
      (item) => String(item.barcode) === String(barcode),
    );
    if (!product) return;
    productModal.open(product);
  });

  // el 7agat ely hatro7 ll foodLog
  productModal.logButton.addEventListener("click", () => {
    const product = productModal.currentProduct;
    if (!product) return;
    const productInfo = {
      type: "product",
      barcode: product.barcode,
      name: product.name,
      brand: product.brand || "",
      image: product.image || "",
      calories: +product.calories || 0,
      protein: +product.protein || 0,
      carbs: +product.carbs || 0,
      fat: +product.fat || 0,
      sugar: +product.sugar || 0,
      date: today,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
    foodLog.push(productInfo);
    saveToLocalStorage();
    productModal.close();
    renderFoodLog();
    Swal.fire({
      title: `${product.name} logged to your daily intake! 📝`,
      toast: true,
      position: "bottom-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: false,
      background: "transparent",
      showClass: { popup: "" },
      hideClass: { popup: "" },
      didOpen: (popup) => {
        popup.style.background = "#10b981";
        popup.style.color = "#fff";
        popup.style.padding = "12px 24px";
        popup.style.borderRadius = "8px";
        popup.style.boxShadow = "0 10px 15px -3px rgba(0,0,0,0.1)";
        popup.style.margin = "0";
        popup.style.boxSizing = "border-box";
        popup.style.maxWidth = "min(90vw, 400px)";
        popup.style.width = "fit-content";

        const title = popup.querySelector(".swal2-title");
        if (title) {
          title.style.color = "#fff";
          title.style.fontSize = "14px";
          title.style.fontWeight = "500";
          title.style.margin = "0";
          title.style.padding = "0";
          title.style.whiteSpace = "normal";
          title.style.wordBreak = "break-word";
        }

        popup.style.transition = "none";
        popup.style.transform = "translateY(150%)";
        popup.style.opacity = "0";

        void popup.offsetHeight;

        popup.style.transition =
          "transform 0.35s ease-out, opacity 0.35s ease-out";
        popup.style.transform = "translateY(0)";
        popup.style.opacity = "1";
      },
      willClose: (popup) => {
        popup.style.transition =
          "transform 0.25s ease-in, opacity 0.25s ease-in";
        popup.style.transform = "translateY(150%)";
        popup.style.opacity = "0";
      },
    });
  });

  searchProductBtn.addEventListener("click", async () => {
    const value = productSearchInput.value.trim();
    if (!value) return;

    products.clear();
    const loader = loading.reqLoading();
    productsGrid.append(loader);

    currentProductGrade = "";
    const results = await mainMeal.getProducts(value, "1", "24");

    loader.remove();

    if (!results || results.length === 0) {
      currentProducts = [];
      productsCount.textContent = "No products found";
      products.emptyState(`No results for "${value}"`);
      return;
    }

    currentProducts = results;
    productsCount.textContent = `Showing ${results.length} products`;
    results.forEach((p) => products.render(p));
  });

  productSearchInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") searchProductBtn.click();
  });
  productSearchInput.addEventListener("input", (e) => {
    const value = e.target.value.trim();

    if (!value) {
      products.clear();
      products.emptyState();
      productsCount.textContent = "Search Results";
      currentProducts = [];
    }
  });

  nutriScoreFilters.forEach((btn) => {
    btn.addEventListener("click", () => {
      const grade = btn.dataset.grade;
      currentProductGrade = grade;

      nutriScoreFilters.forEach((b) => {
        b.classList.remove("bg-emerald-600", "text-white");
      });
      btn.classList.add("bg-emerald-600", "text-white");

      const filtered = grade
        ? currentProducts.filter(
            (p) => p.nutritionGrade?.toLowerCase() === grade,
          )
        : currentProducts;

      products.clear();
      if (filtered.length === 0) {
        productsCount.textContent = "No products match this filter";
        products.emptyState();
      } else {
        productsCount.textContent = `Showing ${filtered.length} products`;
        filtered.forEach((p) => products.render(p));
      }
    });
  });

  lookupBarcodeBtn.addEventListener("click", async () => {
    const barcode = barcodeInput.value.trim();
    if (!barcode) return;
    products.clear();
    const loader = loading.reqLoading();
    productsGrid.append(loader);
    try {
      const product = await mainMeal.getProductByBarcode(barcode);
      loader.remove();
      currentProductGrade = "";
      if (!product) {
        currentProducts = [];
        productsCount.textContent = "Product not found";
        products.emptyState("Check the barcode and try again");
        return;
      }
      currentProducts = [product];

      productsCount.textContent = "Showing 1 product";
      products.render(product);
    } catch (error) {
      loader.remove();
      console.error(error);
      productsCount.textContent = "Failed to lookup product";
      products.emptyState("Something went wrong. Please try again.");
    }
  });

  lookupBarcodeBtn.addEventListener("input", (e) => {
    const value = e.target.value.trim();

    if (!value) {
      products.clear();
      products.emptyState();
      productsCount.textContent = "Search Results";
      currentProducts = [];
    }
  });

  // ! FOOD LOG !

  // ^ OPEN LOG MODAL LISTENER
  logMealBtn.addEventListener("click", () => {
    if (!currentMeal) return;

    logMealModal.open(currentMeal);
  });

  // ^ CONFIRM LOG MODAL LISTENER
  logMealModal.confirmBtn.addEventListener("click", () => {
    if (!currentMeal?.perServing) {
      Swal.fire({
        icon: "error",
        title: "Nutrition data is not ready",
        text: "Please wait until the nutrition information loads.",
      });
      return;
    }
    const servings = +logMealModal.servingsInput.value;

    if (!servings || servings <= 0) {
      Swal.fire({
        icon: "warning",
        title: "Invalid servings",
        text: "Please enter a valid number of servings.",
      });
      return;
    }

    // ^ IMP OBJECT ^ <<<<<<< OBJECT STORE TO LOCAL STORAGE
    const mealInfo = {
      id: currentMeal.id,
      name: currentMeal.name,
      thumbnail: currentMeal.thumbnail,
      servings,
      calories: currentMeal.perServing.calories * servings,
      protein: currentMeal.perServing.protein * servings,
      carbs: currentMeal.perServing.carbs * servings,
      fat: currentMeal.perServing.fat * servings,
      date: today,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    foodLog.push(mealInfo);

    saveToLocalStorage();

    logMealModal.close();

    renderFoodLog();
    Swal.fire({
      title: "Meal Logged!",
      icon: "success",
      showConfirmButton: false,
      html: `
    <p>
      ${mealInfo.name} (${mealInfo.servings}) has been added to your daily log.
    </p>

    <strong style="color: #00a86b; font-size: 18px;">
      +${mealInfo.calories} calories
    </strong>
  `,
      timer: 1500,
    });
  });
  // ^ + / - ,, SERVINGSINPUT ,, CANCEL
  logMealModal.increaseBtn.addEventListener("click", () => {
    let value = +logMealModal.servingsInput.value;

    if (value < 10) {
      logMealModal.servingsInput.value = value + 0.5;
      logMealModal.updateNutrition();
    }
  });
  logMealModal.decreaseBtn.addEventListener("click", () => {
    let value = +logMealModal.servingsInput.value;

    if (value > 0.5) {
      logMealModal.servingsInput.value = value - 0.5;
      logMealModal.updateNutrition();
    }
  });
  logMealModal.servingsInput.addEventListener("input", () => {
    logMealModal.updateNutrition();
  });
  logMealModal.cancelBtn.addEventListener("click", () => {
    logMealModal.close();
  });

  foodLogSection.addEventListener("click", (e) => {
    renderFoodLog();
  });

  // ^ REMOVE ONE RECIPE
  loggedItemsList.addEventListener("click", (e) => {
    let browseBtn = e.target.closest("#browse-recipes-btn");
    if (browseBtn) {
      showPage("home");
      return;
    }
    let clicked = e.target.closest(".remove-foodlog-item");
    if (!clicked) return;
    let index = +clicked.dataset.index;
    let todayLogs = foodLog.filter((item) => item.date === today);
    let itemToRemove = todayLogs[index];
    foodLog = foodLog.filter((item) => item !== itemToRemove);
    Swal.fire({
      position: "bottom-end",
      icon: false,
      backdrop: false,
      title: "Item removed from log",
      showConfirmButton: false,
      timer: 2000,
      width: "220px",
      customClass: {
        popup: "foodlog-alert",
        title: "foodlog-alert-title",
      },
    });
    saveToLocalStorage();
    renderFoodLog();
  });

  // ^ REMOVE ALL RECIPES
  clearFoodlog.addEventListener("click", (e) => {
    Swal.fire({
      title: "Clear Today's Log?",
      text: "This will remove all logged food items for today.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#D73D3D",
      cancelButtonColor: "#606773",
      confirmButtonText: "Yes, clear it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleted!",
          text: "Your food log has been cleared.",
          icon: "success",
        });
        foodLog = foodLog.filter((item) => item.date !== today);
        saveToLocalStorage();
        renderFoodLog();
      }
    });
  });
  renderFoodLog();
}

await initMeals();
