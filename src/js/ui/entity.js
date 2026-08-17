export class Meal {
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.category = data.category;
    this.area = data.area || "International";
    this.instructions = data.instructions || [];
    this.thumbnail = data.thumbnail;
    this.tags = data.tags || [];
    this.youtube = data.youtube;
    this.source = data.source || "";
    this.ingredients = data.ingredients || [];
  }
}

export class Area {
  constructor(area) {
    this.name = area.name;
  }
}

export class Category {
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.thumbnail = data.thumbnail;
    this.description = data.description;
  }
}

export class Product {
  constructor(data) {
    this.barcode = data.barcode;
    this.name = data.name;
    this.brand = data.brand;
    this.image = data.image;
    this.nutritionGrade = data.nutritionGrade;
    this.novaGroup = data.novaGroup;
    this.nutrients = data.nutrients || {};
    this.calories = this.nutrients.calories || 0;
    this.fat = this.nutrients.fat || 0;
    this.carbs = this.nutrients.carbs || 0;
    this.protein = this.nutrients.protein || 0;
    this.sugar = this.nutrients.sugar || 0;
    this.fiber = this.nutrients.fiber || 0;
    this.sodium = this.nutrients.sodium || 0;
  }
}
