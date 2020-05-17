import { Injectable, EventEmitter } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';
import { DataStorageService } from '../shared/data-storage.service';

Injectable()
export class RecipesService {
  recipesChanged = new Subject<Recipe[]>();

  /* recipes: Recipe[] = [
    new Recipe('A test Recipe', 'This is simply a test', 'https://www.goodhousekeeping.com/food-recipes/healthy/g807/vegan-recipes/?slide=1', [
      new Ingredient('mushrooms', 10), new Ingredient('spaghetti', 100)
    ]),
    new Recipe('Another Test Recipe', 'This is simply a test', 'https://upload.wikimedia.org/wikipedia/commons/1/15/Recipe_logo.jpeg', [
      new Ingredient('tofu', 100), new Ingredient('rice', 250)
    ])
  ]; */
  private recipes: Recipe[] = [];

  //recipeSelected = new EventEmitter<Recipe>();
  recipeSelected = new Subject<Recipe>();

  constructor() {}

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.emitRecipesChanged();
  }

  getRecipes(): Recipe[] {
    return this.recipes.slice();
  }

  getRecipeById(id: number): Recipe {
    return this.recipes[id];
  }

  emitRecipesChanged() {
    this.recipesChanged.next(this.recipes.slice());
  }

  addRecipe(newRecipe: Recipe) {
    this.recipes.push(newRecipe);
    this.emitRecipesChanged();

  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.emitRecipesChanged();

  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.emitRecipesChanged();
  }


}
