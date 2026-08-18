export class MealUI {
  constructor(containerElement) {
    this.container = containerElement;
    this.viewMode = "grid";
  }

  setViewMode(mode) {
    this.viewMode = mode;
  }

  render(meal) {
    const isList = this.viewMode === "list";

    let card = document.createElement("div");
    card.classList.add(
      "recipe-card",
      "bg-white",
      "rounded-xl",
      "overflow-hidden",
      "shadow-sm",
      "hover:shadow-lg",
      "transition-all",
      "cursor-pointer",
      "group",
    );
    if (isList) {
      card.classList.add("flex", "flex-row", "h-40");
    }
    card.setAttribute("data-meal-id", `${meal.id}`);

    let article = document.createElement("div");
    article.classList.add("relative", "overflow-hidden");
    article.classList.add(isList ? "w-48" : "h-48");
    if (isList) {
      article.classList.add("h-full");
    }

    let image = document.createElement("img");
    image.classList.add(
      "w-full",
      "h-full",
      "object-cover",
      "group-hover:scale-110",
      "transition-transform",
      "duration-500",
    );
    image.setAttribute("src", `${meal.thumbnail}`);
    image.setAttribute("loading", "lazy");
    image.alt = meal.name;

    let layout = document.createElement("div");
    layout.classList.add("absolute", "bottom-3", "left-3", "flex", "gap-2");
    if (isList) {
      layout.classList.add("hidden");
    }

    let category = document.createElement("span");
    category.classList.add(
      "px-2",
      "py-1",
      "bg-white/90",
      "backdrop-blur-sm",
      "text-xs",
      "font-semibold",
      "rounded-full",
      "text-gray-700",
    );
    let icon = document.createElement("i");
    icon.classList.add("mr-1", "text-emerald-600", "fa-solid", "fa-tag");
    category.append(icon, meal.category);

    if (meal.area !== "International") {
      let area = document.createElement("span");
      area.classList.add(
        "px-2",
        "py-1",
        "bg-white/90",
        "backdrop-blur-sm",
        "text-xs",
        "font-semibold",
        "rounded-lg",
      );
      let iconn = document.createElement("i");
      iconn.classList.add("mr-1", "text-blue-600", "fa-solid", "fa-globe");
      area.append(iconn, meal.area);
      layout.append(category, area);
    } else {
      layout.append(category);
    }

    article.append(image, layout);

    let padding = document.createElement("div");
    padding.classList.add("p-4");

    let name = document.createElement("h3");
    name.classList.add(
      "text-base",
      "font-bold",
      "text-gray-900",
      "mb-1",
      "group-hover:text-emerald-600",
      "transition-colors",
      "line-clamp-1",
    );
    name.textContent = meal.name;

    let desc = document.createElement("p");
    desc.classList.add("text-xs", "text-gray-600", "mb-3", "line-clamp-2");
    desc.textContent = meal.instructions.join(" ");

    let gridFLex = document.createElement("div");
    gridFLex.classList.add(
      "flex",
      "items-center",
      "justify-between",
      "text-xs",
    );

    let categoryBadge = document.createElement("span");
    categoryBadge.classList.add("font-semibold", "text-gray-900");
    let categoryIcon = document.createElement("i");
    categoryIcon.classList.add(
      "fa-solid",
      "fa-utensils",
      "text-emerald-600",
      "mr-1",
    );
    categoryBadge.append(categoryIcon, meal.category);

    let areaBadge = document.createElement("span");
    areaBadge.classList.add("font-semibold", "text-gray-500");
    let areaIcon = document.createElement("i");
    areaIcon.classList.add("fa-solid", "fa-globe", "text-blue-500", "mr-1");
    areaBadge.append(areaIcon, meal.area);

    gridFLex.append(categoryBadge, areaBadge);
    padding.append(name, desc, gridFLex);
    card.append(article, padding);
    this.container.append(card);
  }

  emptyState() {
    let card = document.createElement("div");
    card.classList.add(
      "flex",
      "flex-col",
      "items-center",
      "justify-center",
      "py-12",
      "text-center",
    );
    let shape = document.createElement("div");
    shape.classList.add(
      "w-16",
      "h-16",
      "bg-gray-100",
      "rounded-full",
      "flex",
      "items-center",
      "justify-center",
      "mb-4",
    );
    let icon = document.createElement("i");
    icon.classList.add("fa-solid", "fa-search", "text-gray-400", "text-2xl");
    shape.append(icon);
    let firstP = document.createElement("p");
    firstP.classList.add("text-gray-500", "text-lg");
    firstP.textContent = "No recipes found";
    let secP = document.createElement("p");
    secP.classList.add("text-gray-400", "text-sm", "mt-2");
    secP.textContent = "Try searching for something else";
    card.append(shape, firstP, secP);
    this.container.append(card);
  }

  clear() {
    this.container.replaceChildren();
  }
}

export class AreaUI {
  constructor(containerElement) {
    this.container = containerElement;
  }
  render(area) {
    let btn = document.createElement("button");
    // bg-emerald-600 , text-white , hover:bg-emerald-700 ==> clicked
    btn.classList.add(
      "px-4",
      "py-2",
      "bg-gray-100",
      "text-gray-700",
      "rounded-full",
      "font-medium",
      "text-sm",
      "whitespace-nowrap",
      "hover:bg-gray-200",
      "transition-all",
    );
    btn.textContent = area.name;
    this.container.append(btn);
  }
}

export class CategoryUI {
  constructor(containerElement) {
    this.container = containerElement;
  }
  getCatStyle(config) {
    const categoryStyles = {
      Beef: {
        card: [
          "from-red-50",
          "to-rose-50",
          "border-red-200",
          "hover:border-red-400",
        ],
        icon: ["from-red-400", "to-rose-500"],
        iconClass: "fa-drumstick-bite",
      },

      Chicken: {
        card: [
          "from-amber-50",
          "to-orange-50",
          "border-amber-200",
          "hover:border-amber-400",
        ],
        icon: ["from-orange-400", "to-amber-500"],
        iconClass: "fa-drumstick-bite",
      },

      Dessert: {
        card: [
          "from-pink-50",
          "to-rose-50",
          "border-pink-200",
          "hover:border-pink-400",
        ],
        icon: ["from-pink-400", "to-rose-500"],
        iconClass: "fa-cake-candles",
      },

      Lamb: {
        card: [
          "from-orange-50",
          "to-amber-50",
          "border-orange-200",
          "hover:border-orange-400",
        ],
        icon: ["from-orange-400", "to-amber-500"],
        iconClass: "fa-drumstick-bite",
      },

      Miscellaneous: {
        card: [
          "from-slate-50",
          "to-gray-50",
          "border-slate-200",
          "hover:border-slate-400",
        ],
        icon: ["from-slate-400", "to-gray-500"],
        iconClass: "fa-bowl-rice",
      },

      Pasta: {
        card: [
          "from-yellow-50",
          "to-amber-50",
          "border-yellow-200",
          "hover:border-yellow-400",
        ],
        icon: ["from-yellow-400", "to-amber-500"],
        iconClass: "fa-bowl-food",
      },

      Pork: {
        card: [
          "from-rose-50",
          "to-red-50",
          "border-rose-200",
          "hover:border-rose-400",
        ],
        icon: ["from-red-400", "to-rose-500"],
        iconClass: "fa-bacon",
      },

      Seafood: {
        card: [
          "from-cyan-50",
          "to-blue-50",
          "border-cyan-200",
          "hover:border-cyan-400",
        ],
        icon: ["from-sky-400", "to-blue-500"],
        iconClass: "fa-fish",
      },

      Side: {
        card: [
          "from-green-50",
          "to-emerald-50",
          "border-green-200",
          "hover:border-green-400",
        ],
        icon: ["from-emerald-400", "to-green-500"],
        iconClass: "fa-bowl-food",
      },

      Starter: {
        card: [
          "from-teal-50",
          "to-cyan-50",
          "border-teal-200",
          "hover:border-teal-400",
        ],
        icon: ["from-cyan-400", "to-teal-500"],
        iconClass: "fa-utensils",
      },

      Vegan: {
        card: [
          "from-emerald-50",
          "to-green-50",
          "border-emerald-200",
          "hover:border-emerald-400",
        ],
        icon: ["from-green-400", "to-emerald-500"],
        iconClass: "fa-leaf",
      },

      Vegetarian: {
        card: [
          "from-lime-50",
          "to-green-50",
          "border-lime-200",
          "hover:border-lime-400",
        ],
        icon: ["from-lime-400", "to-green-500"],
        iconClass: "fa-seedling",
      },
    };
    return categoryStyles[config];
  }

  render(category) {
    const style =
      this.getCatStyle(category.name.trim()) ||
      this.getCatStyle("Miscellaneous");
    let card = document.createElement("div");
    card.classList.add(
      "category-card",
      "bg-gradient-to-br",
      ...style.card,
      "rounded-xl",
      "p-3",
      "border",
      "hover:shadow-md",
      "cursor-pointer",
      "transition-all",
      "group",
    );
    card.setAttribute("data-category", `${category.name.trim()}`);
    let cardLayout = document.createElement("div");
    cardLayout.classList.add("flex", "items-center", "gap-2.5");
    let shape = document.createElement("div");
    shape.classList.add(
      "text-white",
      "w-9",
      "h-9",
      "bg-gradient-to-br",
      ...style.icon,
      "rounded-lg",
      "flex",
      "items-center",
      "justify-center",
      "group-hover:scale-110",
      "transition-transform",
      "shadow-sm",
    );
    let icon = document.createElement("i");
    icon.classList.add("fa-solid", style.iconClass);
    shape.append(icon);
    let box = document.createElement("div");
    let title = document.createElement("h3");
    title.classList.add("text-sm", "font-bold", "text-gray-900");
    title.textContent = category.name.trim();
    box.append(title);
    cardLayout.append(shape, box);
    card.append(cardLayout);
    this.container.append(card);
  }
}

export class CatScanUI {
  constructor(containerElement) {
    this.container = containerElement;
  }

  getCatStyle(categoryId) {
    const productStyles = {
      snacks: {
        gradient: ["from-purple-500", "to-pink-500"],
        icon: "fa-cookie",
      },
      beverages: {
        gradient: ["from-blue-500", "to-cyan-500"],
        icon: "fa-bottle-water",
      },
      dairies: { gradient: ["from-sky-400", "to-blue-500"], icon: "fa-cheese" },
      cheeses: {
        gradient: ["from-amber-400", "to-yellow-500"],
        icon: "fa-cheese",
      },
      yogurts: {
        gradient: ["from-red-500", "to-rose-500"],
        icon: "fa-jar",
      },
      chocolates: {
        gradient: ["from-green-700", "to-emerald-500"],
        icon: "fa-cookie-bite",
      },
      biscuits: {
        gradient: ["from-amber-600", "to-orange-600"],
        icon: "fa-cookie",
      },
      "ice-creams": {
        gradient: ["from-pink-400", "to-rose-400"],
        icon: "fa-ice-cream",
      },
      "breakfast-cereals": {
        gradient: ["from-amber-500", "to-orange-500"],
        icon: "fa-wheat-awn",
      },
      breads: {
        gradient: ["from-amber-600", "to-yellow-500"],
        icon: "fa-bread-slice",
      },
      waters: {
        gradient: ["from-cyan-400", "to-blue-400"],
        icon: "fa-glass-water",
      },
      sodas: {
        gradient: ["from-red-500", "to-orange-500"],
        icon: "fa-bottle-droplet",
      },
      coffees: {
        gradient: ["from-stone-600", "to-stone-800"],
        icon: "fa-mug-hot",
      },
      teas: {
        gradient: ["from-emerald-600", "to-teal-700"],
        icon: "fa-mug-saucer",
      },
      fruits: {
        gradient: ["from-red-500", "to-rose-500"],
        icon: "fa-apple-whole",
      },
      vegetables: {
        gradient: ["from-green-500", "to-emerald-500"],
        icon: "fa-carrot",
      },
      meats: {
        gradient: ["from-red-600", "to-rose-600"],
        icon: "fa-drumstick-bite",
      },
      fishes: { gradient: ["from-sky-500", "to-blue-600"], icon: "fa-fish" },
      "plant-based-foods": {
        gradient: ["from-green-600", "to-lime-600"],
        icon: "fa-leaf",
      },
      "chips-and-fries": {
        gradient: ["from-yellow-500", "to-amber-500"],
        icon: "fa-box-tissue",
      },
      sauces: { gradient: ["from-orange-500", "to-red-500"], icon: "fa-jar" },
      spreads: {
        gradient: ["from-amber-700", "to-yellow-600"],
        icon: "fa-spoon",
      },
      pastas: {
        gradient: ["from-yellow-400", "to-amber-500"],
        icon: "fa-bowl-food",
      },
      desserts: {
        gradient: ["from-fuchsia-500", "to-pink-500"],
        icon: "fa-cake-candles",
      },
    };

    return (
      productStyles[categoryId] || {
        gradient: ["from-emerald-500", "to-teal-500"],
        icon: "fa-tag",
      }
    );
  }

  render(category) {
    const catId = category.id;
    const catName = category.name || catId;
    const style = this.getCatStyle(catId);

    const btn = document.createElement("button");
    btn.className = `product-category-btn flex-shrink-0 px-5 py-3 bg-gradient-to-r ${style.gradient.join(" ")} text-white rounded-xl font-semibold hover:shadow-lg transition-all cursor-pointer flex items-center`;
    btn.setAttribute("data-category", catId);

    const icon = document.createElement("i");
    icon.className = `mr-2 fa-solid ${style.icon}`;

    btn.append(icon, document.createTextNode(catName));
    this.container.append(btn);
  }
}

export class LoadingUI {
  constructor(containerElement) {
    this.container = containerElement;
    this.container.style.transition = "opacity 500ms ease";
  }

  render() {
    let card = document.createElement("div");
    card.classList.add("text-center");
    let firstBox = document.createElement("div");
    firstBox.classList.add("relative", "w-20", "h-20", "mx-auto", "mb-6");
    let firstInnerShape = document.createElement("div");
    firstInnerShape.classList.add(
      "absolute",
      "inset-0",
      "rounded-xl",
      "bg-linear-to-br",
      "from-emerald-400",
      "to-teal-600",
      "animate-pulse",
    );
    let secInnerShape = document.createElement("div");
    secInnerShape.classList.add(
      "absolute",
      "inset-0",
      "flex",
      "items-center",
      "justify-center",
    );
    let icon = document.createElement("i");
    icon.classList.add(
      "fa-solid",
      "fa-leaf",
      "text-white",
      "text-3xl",
      "animate-bounce",
    );
    secInnerShape.append(icon);
    let title = document.createElement("h2");
    title.classList.add("text-2xl", "font-bold", "text-gray-900", "mb-2");
    title.textContent = "NutriPlan";
    let text = document.createElement("p");
    text.classList.add("text-gray-500", "mb-4");
    text.textContent = "Loading your wellness journey...";
    let secBox = document.createElement("div");
    secBox.classList.add("flex", "items-center", "justify-center", "gap-1");
    let firstAnimate = document.createElement("div");
    firstAnimate.classList.add(
      "w-2",
      "h-2",
      "bg-emerald-500",
      "rounded-full",
      "animate-bounce",
    );
    firstAnimate.style.cssText = "animation-delay: 0ms";
    let secAnimate = document.createElement("div");
    secAnimate.classList.add(
      "w-2",
      "h-2",
      "bg-emerald-500",
      "rounded-full",
      "animate-bounce",
    );
    secAnimate.style.cssText = "animation-delay: 150ms";
    let thirdAnimate = document.createElement("div");
    thirdAnimate.classList.add(
      "w-2",
      "h-2",
      "bg-emerald-500",
      "rounded-full",
      "animate-bounce",
    );
    thirdAnimate.style.cssText = "animation-delay: 300ms";
    firstBox.append(firstInnerShape, secInnerShape);
    secBox.append(firstAnimate, secAnimate, thirdAnimate);
    card.append(firstBox, title, text, secBox);
    this.container.append(card);

    this.container.classList.remove("hidden");
    this.container.style.opacity = "0";
    this.container.offsetHeight;
    this.container.style.opacity = "1";
  }

  hide() {
    this.container.style.opacity = "0";

    setTimeout(() => {
      this.container.classList.add("hidden");
    }, 500);
  }

  reqLoading() {
    let card = document.createElement("div");
    card.classList.add("flex", "items-center", "justify-center", "py-12");
    let animate = document.createElement("div");
    animate.classList.add(
      "animate-spin",
      "rounded-full",
      "h-12",
      "w-12",
      "border-b-2",
      "border-emerald-600",
    );
    card.append(animate);
    return card;
  }
}

export class MealDetailsUI {
  constructor() {
    this.mealImg = document.getElementById("meal-hero-img");
    this.mealBadges = document.getElementById("meal-badges");
    this.mealTitle = document.getElementById("meal-title");
    this.heroServings = document.getElementById("hero-servings");
    this.heroCalories = document.getElementById("hero-calories");
    this.logMealBtn = document.getElementById("log-meal-btn");
    this.ingredientsCount = document.getElementById("ingredients-count");
    this.ingredientsList = document.getElementById("ingredients-list");
    this.instructionsList = document.getElementById("instructions-list");
    this.mealVideo = document.getElementById("meal-video");
  }
  setLoading(isLoading) {
    const baseClasses = [
      "flex",
      "items-center",
      "gap-2",
      "px-6",
      "py-3",
      "transition-all",
      "rounded-xl",
      "font-semibold",
    ];
    if (isLoading) {
      this.logMealBtn.disabled = true;
      this.logMealBtn.classList.remove(
        "bg-blue-600",
        "text-white",
        "hover:bg-blue-700",
      );
      this.logMealBtn.classList.add(
        ...baseClasses,
        "bg-gray-300",
        "text-gray-500",
        "cursor-not-allowed",
      );
      this.logMealBtn.innerHTML = ` <i class="fa-solid fa-spinner fa-spin"></i> <span>Calculating...</span> `;
    } else {
      this.logMealBtn.disabled = false;

      this.logMealBtn.classList.remove(
        "bg-gray-300",
        "text-gray-500",
        "cursor-not-allowed",
      );

      this.logMealBtn.classList.add(
        ...baseClasses,
        "bg-blue-600",
        "text-white",
        "hover:bg-blue-700",
      );

      this.logMealBtn.innerHTML = `
    <i class="fa-solid fa-clipboard-list"></i>
    <span>Log This Meal</span>
  `;
    }
  }
  render(meal) {
    this.mealImg.setAttribute("src", meal.thumbnail);
    this.mealTitle.textContent = meal.name;
    this.mealBadges.replaceChildren();
    let categoryBadge = document.createElement("span");
    let areaBadge = document.createElement("span");
    let tagsBadge = document.createElement("span");
    let classes = [
      "px-3",
      "py-1",
      "text-white",
      "text-sm",
      "font-semibold",
      "rounded-full",
    ];
    if (meal.category) {
      categoryBadge.classList.add(...classes, "bg-emerald-500");
      categoryBadge.textContent = meal.category;
      this.mealBadges.append(categoryBadge);
    }

    if (meal.area) {
      areaBadge.classList.add(...classes, "bg-blue-500");
      areaBadge.textContent = meal.area;
      this.mealBadges.append(areaBadge);
    }
    if (meal.tags) {
      meal.tags.forEach((tag) => {
        let tagBadge = document.createElement("span");
        tagBadge.classList.add(...classes, "bg-purple-500");
        tagBadge.textContent = tag;
        this.mealBadges.append(tagBadge);
      });
    }

    this.ingredientsCount.textContent = `${meal.ingredients.length} items`;
    const video = meal.youtube ? meal.youtube.split("v=")[1] : "";
    this.mealVideo.src = video ? `https://www.youtube.com/embed/${video}` : "";
    let classesIng = [
      "flex",
      "gap-3",
      "p-3",
      "rounded-xl",
      "bg-gray-50",
      "transition-colors",
      "hover:bg-emerald-50",
    ];
    let classInput = [
      "ingredient-checkbox",
      "w-5",
      "h-5",
      "text-emerald-600",
      "rounded",
      "border-gray-300",
    ];
    let fTextSpan = ["text-gray-700"];
    let sTextSpan = ["font-medium", "text-gray-900"];
    this.ingredientsList.replaceChildren();
    meal.ingredients.forEach((item) => {
      let ingredientRow = document.createElement("div");
      ingredientRow.classList.add(...classesIng);
      let input = document.createElement("input");
      input.type = "checkbox";
      input.classList.add(...classInput);
      let firstSpan = document.createElement("span");
      firstSpan.classList.add(...fTextSpan);
      let secSpan = document.createElement("span");
      secSpan.classList.add(...sTextSpan);
      secSpan.textContent = `${item.measure}`;
      firstSpan.append(secSpan, `${item.ingredient}`);

      ingredientRow.append(input, firstSpan);
      this.ingredientsList.append(ingredientRow);
    });

    let classesInst = [
      "flex",
      "gap-4",
      "p-4",
      "rounded-xl",
      "hover:bg-gray-50",
      "transition-colors",
    ];
    let classCircle = [
      "w-10",
      "h-10",
      "rounded-full",
      "bg-emerald-600",
      "text-white",
      "flex",
      "items-center",
      "justify-center",
      "font-bold",
      "shrink-0",
    ];
    let classP = ["text-gray-700", "leading-relaxed", "pt-2"];
    this.instructionsList.replaceChildren();
    meal.instructions.forEach((instruction, i) => {
      let instructionRow = document.createElement("div");
      instructionRow.classList.add(...classesInst);
      let circle = document.createElement("div");
      circle.textContent = i + 1;
      circle.classList.add(...classCircle);
      let p = document.createElement("p");
      p.classList.add(...classP);
      p.textContent = instruction;
      instructionRow.append(circle, p);
      this.instructionsList.append(instructionRow);
    });
  }
  renderNutrition() {
    const nutritionFactsContainer = document.getElementById(
      "nutrition-facts-container",
    );
    nutritionFactsContainer.replaceChildren();
    const servingText = document.createElement("p");
    servingText.classList.add("text-sm", "text-gray-500", "mb-4");
    servingText.textContent = "Per serving";
    const caloriesWrapper = document.createElement("div");
    caloriesWrapper.classList.add(
      "text-center",
      "py-4",
      "mb-4",
      "bg-linear-to-br",
      "from-emerald-50",
      "to-teal-50",
      "rounded-xl",
    );
    const caloriesTitle = document.createElement("p");
    caloriesTitle.classList.add("text-sm", "text-gray-600");
    caloriesTitle.textContent = "Calories per serving";
    const calories = document.createElement("p");
    this.nutritionCalories = calories;
    calories.classList.add("text-4xl", "font-bold", "text-emerald-600");
    calories.id = "nutrition-calories";
    const totalCalories = document.createElement("p");
    this.totalCalories = totalCalories;
    totalCalories.classList.add("text-xs", "text-gray-500", "mt-1");
    totalCalories.textContent = "Total: 1940 cal";
    caloriesWrapper.append(caloriesTitle, calories, totalCalories);
    const nutritionWrapper = document.createElement("div");
    nutritionWrapper.classList.add("space-y-4");
    const proteinInfo = document.createElement("div");
    proteinInfo.classList.add("flex", "items-center", "justify-between");
    const proteinLabelWrapper = document.createElement("div");
    proteinLabelWrapper.classList.add("flex", "items-center", "gap-2");
    const proteinDot = document.createElement("div");
    proteinDot.classList.add("w-3", "h-3", "rounded-full", "bg-emerald-500");
    const proteinLabel = document.createElement("span");
    proteinLabel.classList.add("text-gray-700");
    proteinLabel.textContent = "Protein";
    const proteinValue = document.createElement("span");
    this.nutritionProtein = proteinValue;
    proteinValue.classList.add("font-bold", "text-gray-900");
    proteinValue.id = "nutrition-protein";
    proteinLabelWrapper.append(proteinDot, proteinLabel);
    proteinInfo.append(proteinLabelWrapper, proteinValue);
    const proteinBarWrapper = document.createElement("div");
    proteinBarWrapper.classList.add(
      "w-full",
      "bg-gray-100",
      "rounded-full",
      "h-2",
    );
    const proteinBar = document.createElement("div");
    this.proteinBar = proteinBar;
    proteinBar.classList.add("bg-emerald-500", "h-2", "rounded-full");
    proteinBar.id = "protein-bar";
    proteinBar.style.width = "84%";
    proteinBarWrapper.append(proteinBar);
    const carbsInfo = document.createElement("div");
    carbsInfo.classList.add("flex", "items-center", "justify-between");
    const carbsLabelWrapper = document.createElement("div");
    carbsLabelWrapper.classList.add("flex", "items-center", "gap-2");
    const carbsDot = document.createElement("div");
    carbsDot.classList.add("w-3", "h-3", "rounded-full", "bg-blue-500");
    const carbsLabel = document.createElement("span");
    carbsLabel.classList.add("text-gray-700");
    carbsLabel.textContent = "Carbs";
    const carbsValue = document.createElement("span");
    this.nutritionCarbs = carbsValue;
    carbsValue.classList.add("font-bold", "text-gray-900");
    carbsValue.id = "nutrition-carbs";
    carbsValue.textContent = "52g";
    carbsLabelWrapper.append(carbsDot, carbsLabel);
    carbsInfo.append(carbsLabelWrapper, carbsValue);
    const carbsBarWrapper = document.createElement("div");
    carbsBarWrapper.classList.add(
      "w-full",
      "bg-gray-100",
      "rounded-full",
      "h-2",
    );
    const carbsBar = document.createElement("div");
    carbsBar.classList.add("bg-blue-500", "h-2", "rounded-full");
    carbsBar.id = "carbs-bar";
    this.carbsBar = carbsBar;
    carbsBarWrapper.append(carbsBar);
    const fatInfo = document.createElement("div");
    fatInfo.classList.add("flex", "items-center", "justify-between");
    const fatLabelWrapper = document.createElement("div");
    fatLabelWrapper.classList.add("flex", "items-center", "gap-2");
    const fatDot = document.createElement("div");
    fatDot.classList.add("w-3", "h-3", "rounded-full", "bg-purple-500");
    const fatLabel = document.createElement("span");
    fatLabel.classList.add("text-gray-700");
    fatLabel.textContent = "Fat";
    const fatValue = document.createElement("span");
    this.nutritionFat = fatValue;
    fatValue.classList.add("font-bold", "text-gray-900");
    fatValue.id = "nutrition-fat";
    fatValue.textContent = "8g";
    fatLabelWrapper.append(fatDot, fatLabel);
    fatInfo.append(fatLabelWrapper, fatValue);
    const fatBarWrapper = document.createElement("div");
    fatBarWrapper.classList.add("w-full", "bg-gray-100", "rounded-full", "h-2");
    const fatBar = document.createElement("div");
    this.fatBar = fatBar;
    fatBar.classList.add("bg-purple-500", "h-2", "rounded-full");
    fatBar.id = "fat-bar";
    fatBarWrapper.append(fatBar);
    const fiberInfo = document.createElement("div");
    fiberInfo.classList.add("flex", "items-center", "justify-between");
    const fiberLabelWrapper = document.createElement("div");
    fiberLabelWrapper.classList.add("flex", "items-center", "gap-2");
    const fiberDot = document.createElement("div");
    fiberDot.classList.add("w-3", "h-3", "rounded-full", "bg-orange-500");
    const fiberLabel = document.createElement("span");
    fiberLabel.classList.add("text-gray-700");
    fiberLabel.textContent = "Fiber";
    const fiberValue = document.createElement("span");
    this.nutritionFiber = fiberValue;
    fiberValue.classList.add("font-bold", "text-gray-900");
    fiberValue.id = "nutrition-fiber";
    fiberLabelWrapper.append(fiberDot, fiberLabel);
    fiberInfo.append(fiberLabelWrapper, fiberValue);
    const fiberBarWrapper = document.createElement("div");
    fiberBarWrapper.classList.add(
      "w-full",
      "bg-gray-100",
      "rounded-full",
      "h-2",
    );
    const fiberBar = document.createElement("div");
    this.fiberBar = fiberBar;
    fiberBar.classList.add("bg-orange-500", "h-2", "rounded-full");
    fiberBar.id = "fiber-bar";
    fiberBarWrapper.append(fiberBar);
    const sugarInfo = document.createElement("div");
    sugarInfo.classList.add("flex", "items-center", "justify-between");
    const sugarLabelWrapper = document.createElement("div");
    sugarLabelWrapper.classList.add("flex", "items-center", "gap-2");
    const sugarDot = document.createElement("div");
    sugarDot.classList.add("w-3", "h-3", "rounded-full", "bg-pink-500");
    const sugarLabel = document.createElement("span");
    sugarLabel.classList.add("text-gray-700");
    sugarLabel.textContent = "Sugar";
    const sugarValue = document.createElement("span");
    this.nutritionSugar = sugarValue;
    sugarValue.classList.add("font-bold", "text-gray-900");
    sugarValue.id = "nutrition-sugar";
    sugarLabelWrapper.append(sugarDot, sugarLabel);
    sugarInfo.append(sugarLabelWrapper, sugarValue);
    const sugarBarWrapper = document.createElement("div");
    sugarBarWrapper.classList.add(
      "w-full",
      "bg-gray-100",
      "rounded-full",
      "h-2",
    );
    const sugarBar = document.createElement("div");
    this.sugarBar = sugarBar;
    sugarBar.classList.add("bg-pink-500", "h-2", "rounded-full");
    sugarBar.id = "sugar-bar";
    sugarBarWrapper.append(sugarBar);
    nutritionWrapper.append(
      proteinInfo,
      proteinBarWrapper,
      carbsInfo,
      carbsBarWrapper,
      fatInfo,
      fatBarWrapper,
      fiberInfo,
      fiberBarWrapper,
      sugarInfo,
      sugarBarWrapper,
    );

    nutritionFactsContainer.append(
      servingText,
      caloriesWrapper,
      nutritionWrapper,
    );
  }
  renderNutritionLoading() {
    const nutritionFactsContainer = document.getElementById(
      "nutrition-facts-container",
    );

    nutritionFactsContainer.replaceChildren();

    let loadingWrapper = document.createElement("div");
    loadingWrapper.classList.add("text-center", "py-8");

    let iconWrapper = document.createElement("div");
    iconWrapper.classList.add(
      "inline-flex",
      "items-center",
      "justify-center",
      "w-12",
      "h-12",
      "rounded-full",
      "bg-emerald-100",
      "mb-4",
    );

    let calculatorIcon = document.createElement("i");
    calculatorIcon.classList.add(
      "animate-pulse",
      "text-emerald-600",
      "text-xl",
      "fa-solid",
      "fa-calculator",
    );

    iconWrapper.append(calculatorIcon);

    let title = document.createElement("p");
    title.classList.add("text-gray-700", "font-medium", "mb-1");
    title.textContent = "Calculating Nutrition";

    let desc = document.createElement("p");
    desc.classList.add("text-gray-500", "text-sm");
    desc.textContent = "Analyzing ingredients...";

    let outerDotsWrapper = document.createElement("div");
    outerDotsWrapper.classList.add("mt-4", "flex", "justify-center");

    let innerDotsWrapper = document.createElement("div");
    innerDotsWrapper.classList.add("flex", "space-x-1");

    const classDots = [
      "w-2",
      "h-2",
      "bg-emerald-500",
      "rounded-full",
      "animate-bounce",
    ];

    let dot1 = document.createElement("div");
    dot1.classList.add(...classDots);
    dot1.style.animationDelay = "0ms";

    let dot2 = document.createElement("div");
    dot2.classList.add(...classDots);
    dot2.style.animationDelay = "150ms";

    let dot3 = document.createElement("div");
    dot3.classList.add(...classDots);
    dot3.style.animationDelay = "300ms";

    innerDotsWrapper.append(dot1, dot2, dot3);
    outerDotsWrapper.append(innerDotsWrapper);
    loadingWrapper.append(iconWrapper, title, desc, outerDotsWrapper);

    nutritionFactsContainer.append(loadingWrapper);
  }
  updateNutrition(meal) {
    this.heroServings.textContent = `${meal.servings} servings`;
    this.heroCalories.textContent = `${meal.perServing.calories} cal`;
    this.nutritionCalories.textContent = `${meal.perServing.calories} cal`;
    this.totalCalories.textContent = `Total: ${meal.totals.calories} cal`;
    this.nutritionProtein.textContent = `${meal.perServing.protein}g`;
    this.nutritionCarbs.textContent = `${meal.perServing.carbs}g`;
    this.nutritionFat.textContent = `${meal.perServing.fat}g`;
    this.nutritionFiber.textContent = `${meal.perServing.fiber}g`;
    this.nutritionSugar.textContent = `${meal.perServing.sugar}g`;
    this.proteinBar.style.width = `${Math.min((meal.perServing.protein / 50) * 100, 100)}%`;
    this.carbsBar.style.width = `${Math.min((meal.perServing.carbs / 275) * 100, 100)}%`;
    this.fatBar.style.width = `${Math.min((meal.perServing.fat / 78) * 100, 100)}%`;
    this.fiberBar.style.width = `${Math.min((meal.perServing.fiber / 28) * 100, 100)}%`;
    this.sugarBar.style.width = `${Math.min((meal.perServing.sugar / 50) * 100, 100)}%`;
  }
}

export class FoodLogUI {
  constructor() {
    this.caloriesProgressPercent = document.getElementById(
      "calories-progress-percent",
    );
    this.caloriesProgressBar = document.getElementById("calories-progress-bar");
    this.caloriesProgressValue = document.getElementById(
      "calories-progress-value",
    );
    this.caloriesProgressMax = document.getElementById("calories-progress-max");

    this.proteinProgressPercent = document.getElementById(
      "protein-progress-percent",
    );
    this.proteinProgressBar = document.getElementById("protein-progress-bar");
    this.proteinProgressValue = document.getElementById(
      "protein-progress-value",
    );
    this.proteinProgressMax = document.getElementById("protein-progress-max");

    this.carbsProgressPercent = document.getElementById(
      "carbs-progress-percent",
    );
    this.carbsProgressBar = document.getElementById("carbs-progress-bar");
    this.carbsProgressValue = document.getElementById("carbs-progress-value");
    this.carbsProgressMax = document.getElementById("carbs-progress-max");

    this.fatProgressPercent = document.getElementById("fat-progress-percent");
    this.fatProgressBar = document.getElementById("fat-progress-bar");
    this.fatProgressValue = document.getElementById("fat-progress-value");
    this.fatProgressMax = document.getElementById("fat-progress-max");

    this.loggedItemsCount = document.getElementById("logged-items-count");
    this.loggedItemsList = document.getElementById("logged-items-list");
    this.weeklyChart = document.getElementById("weekly-chart");
    this.clearFoodlogBtn = document.getElementById("clear-foodlog");
    this.quickStats = document.getElementById("quick-stats");
  }
  render(logs, totals) {
    const caloriesPercent = Math.min(
      Math.round((totals.calories / 2000) * 100),
      100,
    );
    const proteinPercent = Math.min(
      Math.round((totals.protein / 50) * 100),
      100,
    );
    const carbsPercent = Math.min(Math.round((totals.carbs / 250) * 100), 100);
    const fatPercent = Math.min(Math.round((totals.fat / 65) * 100), 100);

    this.caloriesProgressPercent.textContent = `${caloriesPercent}%`;
    this.caloriesProgressBar.style.width = `${caloriesPercent}%`;
    this.caloriesProgressValue.textContent = `${totals.calories} kcal`;
    this.caloriesProgressMax.textContent = `/ 2000 kcal`;

    this.proteinProgressPercent.textContent = `${proteinPercent}%`;
    this.proteinProgressBar.style.width = `${proteinPercent}%`;
    this.proteinProgressValue.textContent = `${totals.protein} g`;
    this.proteinProgressMax.textContent = `/ 50 g`;

    this.carbsProgressPercent.textContent = `${carbsPercent}%`;
    this.carbsProgressBar.style.width = `${carbsPercent}%`;
    this.carbsProgressValue.textContent = `${totals.carbs} g`;
    this.carbsProgressMax.textContent = `/ 250 g`;

    this.fatProgressPercent.textContent = `${fatPercent}%`;
    this.fatProgressBar.style.width = `${fatPercent}%`;
    this.fatProgressValue.textContent = `${totals.fat} g`;
    this.fatProgressMax.textContent = `/ 65 g`;
    this.loggedItemsCount.textContent = `Logged Items (${logs.length})`;
    this.clearFoodlogBtn.style.display = logs.length > 0 ? "block" : "none";
    this.loggedItemsList.replaceChildren();
    if (logs.length === 0) {
      this.emptyState();
    } else {
      logs.forEach((item, index) => {
        let row = document.createElement("div");
        row.classList.add(
          "flex",
          "items-center",
          "justify-between",
          "bg-gray-50",
          "rounded-xl",
          "p-4",
          "hover:bg-gray-100",
          "transition-all",
        );

        let leftSide = document.createElement("div");
        leftSide.classList.add("flex", "items-center", "gap-4");

        let img = document.createElement("img");
        img.src = item.thumbnail || item.image;
        img.alt = item.name;
        img.classList.add("w-14", "h-14", "rounded-xl", "object-cover");

        let textBox = document.createElement("div");

        let name = document.createElement("p");
        name.classList.add("font-semibold", "text-gray-900");
        name.textContent = item.name;

        let servingLine = document.createElement("p");
        servingLine.classList.add("text-sm", "text-gray-500");
        const servings = item?.servings || 1;

        let servingText = document.createTextNode(
          `${servings} serving${servings !== 1 ? "s " : " "}`,
        );

        let dot = document.createElement("span");
        dot.classList.add("mx-1");
        dot.textContent = "•";
        let recipeSpan = document.createElement("span");
        recipeSpan.classList.add("text-emerald-600");
        recipeSpan.textContent = "Recipe";
        servingLine.append(servingText, dot, recipeSpan);

        let timeLine = document.createElement("p");
        timeLine.classList.add("text-xs", "text-gray-400", "mt-1");
        timeLine.textContent = item.time || "";

        textBox.append(name, servingLine, timeLine);
        leftSide.append(img, textBox);

        let rightSide = document.createElement("div");
        rightSide.classList.add("flex", "items-center", "gap-4");

        let calBox = document.createElement("div");
        calBox.classList.add("text-right");
        let cal = document.createElement("p");
        cal.classList.add("text-lg", "font-bold", "text-emerald-600");
        cal.textContent = item.calories;
        let calLabel = document.createElement("p");
        calLabel.classList.add("text-xs", "text-gray-500");
        calLabel.textContent = "kcal";
        calBox.append(cal, calLabel);

        let macros = document.createElement("div");
        macros.classList.add(
          "hidden",
          "md:flex",
          "gap-2",
          "text-xs",
          "text-gray-500",
        );
        let protSpan = document.createElement("span");
        protSpan.classList.add("px-2", "py-1", "bg-blue-50", "rounded");
        protSpan.textContent = `${item.protein}g P`;
        let carbSpan = document.createElement("span");
        carbSpan.classList.add("px-2", "py-1", "bg-amber-50", "rounded");
        carbSpan.textContent = `${item.carbs}g C`;
        let fatSpan = document.createElement("span");
        fatSpan.classList.add("px-2", "py-1", "bg-purple-50", "rounded");
        fatSpan.textContent = `${item.fat}g F`;
        macros.append(protSpan, carbSpan, fatSpan);

        let removeBtn = document.createElement("button");
        removeBtn.classList.add(
          "remove-foodlog-item",
          "text-gray-400",
          "hover:text-red-500",
          "transition-all",
          "p-2",
        );
        removeBtn.dataset.index = index;
        let removeIcon = document.createElement("i");
        removeIcon.classList.add("fa-solid", "fa-trash-can");
        removeBtn.append(removeIcon);

        rightSide.append(calBox, macros, removeBtn);
        row.append(leftSide, rightSide);
        this.loggedItemsList.append(row);
      });
    }
  }
  emptyState() {
    let box = document.createElement("div");
    box.classList.add("text-center", "py-12");

    let iconCircle = document.createElement("div");
    iconCircle.classList.add(
      "w-20",
      "h-20",
      "bg-gray-100",
      "rounded-full",
      "flex",
      "items-center",
      "justify-center",
      "mx-auto",
      "mb-4",
    );
    let icon = document.createElement("i");
    icon.classList.add("fa-solid", "fa-utensils", "text-3xl", "text-gray-300");
    iconCircle.append(icon);

    let title = document.createElement("p");
    title.classList.add("text-gray-500", "font-medium", "mb-2");
    title.textContent = "No food logged today";

    let sub = document.createElement("p");
    sub.classList.add("text-gray-400", "text-sm", "mb-4");
    sub.textContent =
      "Start tracking your nutrition by logging meals or scanning products";

    let btnRow = document.createElement("div");
    btnRow.classList.add("flex", "justify-center", "gap-3");

    let browseBtn = document.createElement("a");
    browseBtn.href = "#";
    browseBtn.id = "browse-recipes-btn";
    browseBtn.classList.add(
      "inline-flex",
      "items-center",
      "gap-2",
      "px-4",
      "py-2",
      "bg-emerald-600",
      "text-white",
      "rounded-lg",
      "hover:bg-emerald-700",
      "transition-all",
    );
    let browseIcon = document.createElement("i");
    browseIcon.classList.add("fa-solid", "fa-plus");
    browseBtn.append(browseIcon, "Browse Recipes");

    let scanBtn = document.createElement("a");
    scanBtn.href = "#";
    scanBtn.classList.add(
      "nav-link",
      "inline-flex",
      "items-center",
      "gap-2",
      "px-4",
      "py-2",
      "bg-blue-600",
      "text-white",
      "rounded-lg",
      "hover:bg-blue-700",
      "transition-all",
    );
    scanBtn.dataset.page = "productsSection";
    let scanIcon = document.createElement("i");
    scanIcon.classList.add("fa-solid", "fa-barcode");
    scanBtn.append(scanIcon, "Scan Product");

    btnRow.append(browseBtn, scanBtn);
    box.append(iconCircle, title, sub, btnRow);
    this.loggedItemsList.append(box);
  }
  weeklyEmptyState() {
    this.weeklyChart.className =
      "h-64 bg-gray-50 rounded-xl flex items-center justify-center";

    let box = document.createElement("div");
    box.classList.add("text-center", "text-gray-400");

    let icon = document.createElement("i");
    icon.classList.add("fa-solid", "fa-chart-line", "text-4xl", "mb-2");

    let text = document.createElement("p");
    text.textContent = "Weekly nutrition chart will appear here";

    box.append(icon, text);
    this.weeklyChart.append(box);
  }

  renderWeekly(foodLog) {
    this.weeklyChart.replaceChildren();

    this.weeklyChart.className = "grid grid-cols-7 gap-2";

    for (let i = 6; i >= 0; i--) {
      let day = new Date();
      day.setDate(day.getDate() - i);

      let dayLogs = foodLog.filter((item) => item.date === day.toDateString());

      let dayCalories = dayLogs.reduce((sum, item) => sum + item.calories, 0);

      let isToday = i === 0;

      let dayBox = document.createElement("div");
      dayBox.classList.add("text-center");

      if (isToday) {
        dayBox.classList.add("bg-indigo-100", "rounded-xl");
      }

      let dayName = document.createElement("p");
      dayName.classList.add("text-xs", "text-gray-500", "mb-1");
      dayName.textContent = day.toLocaleDateString("en-US", {
        weekday: "short",
      });

      let dayNumber = document.createElement("p");
      dayNumber.classList.add("text-sm", "font-medium", "text-gray-900");
      dayNumber.textContent = day.getDate();

      let calBox = document.createElement("div");
      calBox.classList.add(
        "mt-2",
        dayCalories > 0 ? "text-emerald-600" : "text-gray-300",
      );

      let calValue = document.createElement("p");
      calValue.classList.add("text-lg", "font-bold");
      calValue.textContent = dayCalories;

      let calLabel = document.createElement("p");
      calLabel.classList.add("text-xs");
      calLabel.textContent = "kcal";

      calBox.append(calValue, calLabel);
      dayBox.append(dayName, dayNumber, calBox);

      if (dayLogs.length > 0) {
        let itemsCount = document.createElement("p");
        itemsCount.classList.add("text-xs", "text-gray-400", "mt-1");
        itemsCount.textContent = `${dayLogs.length} items`;
        dayBox.append(itemsCount);
      }

      this.weeklyChart.append(dayBox);
    }
  }
  renderQuickStats(foodLog) {
    this.quickStats.replaceChildren();

    let totalWeekCalories = 0;
    let totalWeekItems = 0;
    let daysOnGoal = 0;

    for (let i = 6; i >= 0; i--) {
      let day = new Date();
      day.setDate(day.getDate() - i);
      let dayLogs = foodLog.filter((item) => item.date === day.toDateString());

      let dayCalories = dayLogs.reduce((sum, item) => sum + item.calories, 0);
      totalWeekCalories += dayCalories;
      totalWeekItems += dayLogs.length;
      if (dayLogs.length > 0) {
        daysOnGoal++;
      }
    }
    let weeklyAverage = Math.round(totalWeekCalories / 7);

    let statsData = [
      {
        icon: "fa-chart-line",
        bg: "bg-emerald-100",
        iconColor: "text-emerald-600",
        label: "Weekly Average",
        value: `${weeklyAverage} kcal`,
      },
      {
        icon: "fa-utensils",
        bg: "bg-blue-100",
        iconColor: "text-blue-600",
        label: "Total Items This Week",
        value: `${totalWeekItems} items`,
      },
      {
        icon: "fa-bullseye",
        bg: "bg-purple-100",
        iconColor: "text-purple-600",
        label: "Days Logged",
        value: `${daysOnGoal} / 7`,
      },
    ];
    statsData.forEach((stat) => {
      let card = document.createElement("div");
      card.classList.add(
        "bg-white",
        "rounded-xl",
        "p-4",
        "border-2",
        "border-gray-200",
      );
      let innerRow = document.createElement("div");
      innerRow.classList.add("flex", "items-center", "gap-3");
      card.append(innerRow);
      let iconCircle = document.createElement("div");
      iconCircle.classList.add(
        "w-12",
        "h-12",
        stat.bg,
        "rounded-xl",
        "flex",
        "items-center",
        "justify-center",
      );
      let icon = document.createElement("i");
      icon.classList.add("fa-solid", stat.icon, stat.iconColor, "text-xl");
      iconCircle.append(icon);
      let textBox = document.createElement("div");
      let label = document.createElement("p");
      label.classList.add("text-sm", "text-gray-500");
      label.textContent = stat.label;
      let value = document.createElement("p");
      value.classList.add("text-xl", "font-bold", "text-gray-900");
      value.textContent = stat.value;
      textBox.append(label, value);
      innerRow.append(iconCircle, textBox);
      this.quickStats.append(card);
    });
  }
}

export class LogMealModalUI {
  constructor() {
    this.modal = document.getElementById("log-meal-modal");

    this.image = document.getElementById("modal-meal-image");
    this.name = document.getElementById("modal-meal-name");

    this.servingsInput = document.getElementById("meal-servings");

    this.calories = document.getElementById("modal-calories");
    this.protein = document.getElementById("modal-protein");
    this.carbs = document.getElementById("modal-carbs");
    this.fat = document.getElementById("modal-fat");

    this.decreaseBtn = document.getElementById("decrease-servings");
    this.increaseBtn = document.getElementById("increase-servings");
    this.cancelBtn = document.getElementById("cancel-log-meal");
    this.confirmBtn = document.getElementById("confirm-log-meal");
  }

  open(meal) {
    this.currentMeal = meal;

    this.image.src = meal.thumbnail;
    this.image.alt = meal.name;

    this.name.textContent = meal.name;

    this.servingsInput.value = 1;

    this.updateNutrition();

    this.modal.classList.remove("hidden");
  }

  close() {
    this.modal.classList.add("hidden");
  }

  updateNutrition() {
    const servings = +this.servingsInput.value;

    this.calories.textContent = Math.round(
      this.currentMeal.perServing.calories * servings,
    );

    this.protein.textContent = `${Math.round(
      this.currentMeal.perServing.protein * servings,
    )}g`;

    this.carbs.textContent = `${Math.round(
      this.currentMeal.perServing.carbs * servings,
    )}g`;

    this.fat.textContent = `${Math.round(
      this.currentMeal.perServing.fat * servings,
    )}g`;
  }
}

// ^ PRODUCT UI ^

export class ProductUI {
  constructor(containerElement) {
    this.productsGrid = containerElement;
    this.modal = null;
  }

  clear() {
    this.productsGrid.replaceChildren();
  }

  emptyState(message = "Search for a product or browse by category") {
    this.productsGrid.innerHTML = `
      <div id="products-empty" class="col-span-full py-12">
        <div class="text-center ">
          <div class="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <i class="fa-solid fa-box-open text-3xl text-gray-400"></i>
          </div>
          <p class="text-gray-500 text-lg mb-2">No products to display</p>
          <p class="text-gray-400 text-sm">${message}</p>
        </div>
      </div>
    `;
  }

  getNutriStyle(config) {
    const NutriStyles = {
      a: { style: ["bg-green-600"], content: "A" },
      b: { style: ["bg-lime-500"], content: "B" },
      c: { style: ["bg-yellow-500"], content: "C" },
      d: { style: ["bg-orange-500"], content: "D" },
      e: { style: ["bg-red-500"], content: "E" },
      unknown: { style: ["bg-gray-400"], content: "UNKOWN" },
    };
    return NutriStyles[config?.toLowerCase()] || NutriStyles.unknown;
  }

  render(product) {
    const wrapper = document.createElement("div");
    wrapper.className =
      "product-card bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all cursor-pointer group";

    wrapper.dataset.barcode = product.barcode;

    const box = document.createElement("div");
    box.className =
      "relative h-40 bg-gray-100 flex items-center justify-center overflow-hidden";
    const image = document.createElement("img");
    image.className =
      "w-full h-full object-contain group-hover:scale-110 transition-transform duration-300";
    image.src = product.image || "";
    image.alt = product.name || "Product";
    image.loading = "lazy";
    image.onerror = () => {
      image.style.display = "none";
      const fallback = document.createElement("div");
      fallback.className =
        "w-16 h-16 bg-gray-200 rounded-xl flex items-center justify-center";

      fallback.innerHTML = `
        <i class="fa-solid fa-box text-gray-400 text-2xl"></i>
      `;

      box.append(fallback);
    };

    // <!-- Nutri-Score Badge -->
    const nutriStyle = this.getNutriStyle(product.nutritionGrade);
    const nutriBadge = document.createElement("div");
    nutriBadge.className = `absolute top-2 left-2 ${nutriStyle.style} text-white text-xs font-bold px-2 py-1 rounded uppercase`;
    nutriBadge.textContent = `Nutri-Score ${nutriStyle.content}`;

    // NOVA
    const novaBadge = document.createElement("div");
    novaBadge.className =
      "absolute top-2 right-2 bg-red-500 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center";
    novaBadge.textContent = product.novaGroup || "?";
    box.append(image, nutriBadge, novaBadge);

    const secBox = document.createElement("div");
    secBox.className = "p-4";
    const title = document.createElement("p");
    title.className = "text-xs text-emerald-600 font-semibold mb-1 truncate";
    title.textContent = product.brand || "Unknown Brand";
    const desc = document.createElement("h3");
    desc.className =
      "font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-emerald-600 transition-colors";
    desc.textContent = product.name || "Unknown Product";
    const layout = document.createElement("div");
    layout.className = "flex items-center gap-3 text-xs text-gray-500 mb-3";
    const span = document.createElement("span");
    const icon = document.createElement("i");
    icon.className = "mr-1 fa-solid fa-weight-scale";
    span.append(icon, "Per 100g");
    const secSpan = document.createElement("span");
    const secIcon = document.createElement("i");
    secIcon.className = "mr-1 fa-solid fa-fire";
    secSpan.append(
      secIcon,
      `${(+(product.calories || 0)).toFixed(1)} kcal / 100g`,
    );
    layout.append(span, secSpan);
    secBox.append(title, desc, layout);

    const miniNutrition = document.createElement("div");
    miniNutrition.className = "grid grid-cols-4 gap-1 text-center";
    const classBoxes = ["rounded", "p-1.5"];
    const classNum = ["text-xs", "font-bold"];
    const classDesc = ["text-[10px]", "text-gray-500"];

    const boxProtein = document.createElement("div");
    boxProtein.classList.add("bg-emerald-50", ...classBoxes);
    const numProt = document.createElement("p");
    numProt.classList.add(...classNum, "text-emerald-700");
    numProt.textContent = `${(+(product.protein || 0)).toFixed(1)}g`;
    const descProt = document.createElement("p");
    descProt.classList.add(...classDesc);
    descProt.textContent = "Protein";
    boxProtein.append(numProt, descProt);

    const boxCarbs = document.createElement("div");
    boxCarbs.classList.add("bg-blue-50", ...classBoxes);
    const numCarbs = document.createElement("p");
    numCarbs.classList.add(...classNum, "text-blue-700");
    numCarbs.textContent = `${(+(product.carbs || 0)).toFixed(1)}g`;
    const descCarbs = document.createElement("p");
    descCarbs.classList.add(...classDesc);
    descCarbs.textContent = "Carbs";
    boxCarbs.append(numCarbs, descCarbs);

    const boxFat = document.createElement("div");
    boxFat.classList.add("bg-purple-50", ...classBoxes);
    const numFat = document.createElement("p");
    numFat.classList.add(...classNum, "text-purple-700");
    numFat.textContent = `${(+(product.fat || 0)).toFixed(1)}g`;
    const descFat = document.createElement("p");
    descFat.classList.add(...classDesc);
    descFat.textContent = "Fat";
    boxFat.append(numFat, descFat);

    const boxSugar = document.createElement("div");
    boxSugar.classList.add("bg-orange-50", ...classBoxes);
    const numSugar = document.createElement("p");
    numSugar.classList.add(...classNum, "text-orange-700");
    numSugar.textContent = `${(+(product.sugar || 0)).toFixed(1)}g`;
    const descSugar = document.createElement("p");
    descSugar.classList.add(...classDesc);
    descSugar.textContent = "Sugar";
    boxSugar.append(numSugar, descSugar);

    miniNutrition.append(boxProtein, boxCarbs, boxFat, boxSugar);
    wrapper.append(box, secBox, miniNutrition);
    this.productsGrid.append(wrapper);
  }
}

export class ProductModalUI {
  constructor() {
    this.modal = document.getElementById("product-detail-modal");

    this.image = document.getElementById("product-modal-image");
    this.brand = document.getElementById("product-modal-brand");
    this.name = document.getElementById("product-modal-name");
    this.quantity = document.getElementById("product-modal-quantity");
    this.nutriBadge = document.getElementById("product-modal-nutri-badge");
    this.nutriLabel = document.getElementById("product-modal-nutri-label");
    this.nutriDescription = document.getElementById(
      "product-modal-nutri-description",
    );
    this.novaBadge = document.getElementById("product-modal-nova-badge");
    this.novaLabel = document.getElementById("product-modal-nova-label");
    this.novaDescription = document.getElementById(
      "product-modal-nova-description",
    );
    this.calories = document.getElementById("product-modal-calories");
    this.protein = document.getElementById("product-modal-protein");
    this.carbs = document.getElementById("product-modal-carbs");
    this.fat = document.getElementById("product-modal-fat");
    this.sugar = document.getElementById("product-modal-sugar");
    this.saturatedFat = document.getElementById("product-modal-saturated-fat");
    this.fiber = document.getElementById("product-modal-fiber");
    this.salt = document.getElementById("product-modal-salt");
    this.ingredientsSection = document.getElementById(
      "product-modal-ingredients-section",
    );
    this.ingredients = document.getElementById("product-modal-ingredients");
    this.logButton = document.getElementById("add-product-to-log");
    this.closeButtons = document.querySelectorAll(".close-product-modal");

    this.currentProduct = null;

    this.closeButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        this.close();
      });
    });
    this.modal.addEventListener("click", (e) => {
      if (e.target === this.modal) {
        this.close();
      }
    });
  }
  getNutriStyle(grade) {
    const styles = {
      a: {
        background: "#038141",
        lightBackground: "#03814120",
        description: "Excellent",
      },

      b: {
        background: "#85bb2f",
        lightBackground: "#85bb2f20",
        description: "Good",
      },

      c: {
        background: "#fecb02",
        lightBackground: "#fecb0220",
        description: "Average",
      },

      d: {
        background: "#ee8100",
        lightBackground: "#ee810020",
        description: "Below Average",
      },

      e: {
        background: "#e63e11",
        lightBackground: "#e63e1120",
        description: "Poor",
      },

      unknown: {
        background: "#9ca3af",
        lightBackground: "#9ca3af20",
        description: "Unknown",
      },
    };

    return styles[grade?.toLowerCase()];
  }

  getNovaDescription(novaGroup) {
    const descriptions = {
      1: "Unprocessed or minimally processed",
      2: "Processed culinary ingredients",
      3: "Processed food",
      4: "Ultra-processed",
    };

    return descriptions[novaGroup] || "UNKOWN";
  }

  open(product) {
    this.currentProduct = product;

    this.image.src = product.image || "";
    this.image.alt = product.name || "Product";
    this.brand.textContent = product.brand || "Unknown Brand";
    this.name.textContent = product.name || "Unknown Product";

    const grade = product.nutritionGrade?.toLowerCase() || "unknown";
    const nutriStyle = this.getNutriStyle(grade);
    this.nutriBadge.textContent =
      grade === "unknown" ? "?" : grade.toUpperCase();
    this.nutriBadge.style.backgroundColor = nutriStyle.background;
    this.nutriLabel.textContent = "Nutri-Score";
    this.nutriLabel.style.color = nutriStyle.background;
    this.nutriDescription.textContent = nutriStyle.description;
    this.nutriBadge.parentElement.style.backgroundColor =
      nutriStyle.lightBackground;

    const novaGroup = product.novaGroup;
    this.novaBadge.textContent = novaGroup || "?";
    this.novaBadge.style.backgroundColor = "#e63e11";
    this.novaLabel.style.color = "#e63e11";
    this.novaDescription.textContent = this.getNovaDescription(novaGroup);
    this.novaBadge.parentElement.style.backgroundColor = "#e63e1120";

    this.calories.textContent = Math.round(+(product.calories || 0));
    this.protein.textContent = `${(+(product.protein || 0)).toFixed(1)}g`;
    this.carbs.textContent = `${(+(product.carbs || 0)).toFixed(1)}g`;
    this.fat.textContent = `${(+(product.fat || 0)).toFixed(1)}g`;
    this.sugar.textContent = `${(+(product.sugar || 0)).toFixed(1)}g`;

    this.saturatedFat.textContent = "N/A";

    this.fiber.textContent = `${(+(product.fiber || 0)).toFixed(1)}g`;

    this.salt.textContent = `${(+(product.sodium || 0) * 2.5).toFixed(2)}g`;

    const ingredientsData = product.ingredients;

    if (product.ingredients) {
      this.ingredients.textContent = Array.isArray(product.ingredients)
        ? product.ingredients.join("; ")
        : product.ingredients;

      this.ingredientsSection.classList.remove("hidden");
    } else {
      this.ingredientsSection.classList.add("hidden");
    }
    this.logButton.dataset.barcode = product.barcode || "";
    this.modal.classList.remove("hidden");
  }

  close() {
    this.modal.classList.add("hidden");
    this.currentProduct = null;
  }
}
