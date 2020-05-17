import { Ingredient } from "../shared/ingredient.model";
import { EventEmitter } from "@angular/core";
import { Subject } from 'rxjs';

export class ShoppingListService {
  //ingredientsChanged = new EventEmitter<Ingredient[]>();
  ingredientsChanged = new Subject<Ingredient[]>();
  startEditing = new Subject<number>();

  private ingredients: Ingredient[] = [
    new Ingredient("apples", 5),
    new Ingredient("tomatoes", 10)
  ];

  getIngredients(): Ingredient[] {
    return this.ingredients.slice();
  }

  getIngredient(index: number) {
    return this.ingredients.slice()[index];
  }

  emitIngredientsChanged() {
    this.ingredientsChanged.next(this.ingredients.slice());
  }

/*   addIngredient(ingredient: Ingredient) {
    const ingredientNames = this.ingredients.map(ingredient => ingredient.name);

    if (ingredientNames.includes(ingredient.name)) {
      this.ingredients[ingredientNames.indexOf(ingredient.name)].amount +=
        ingredient.amount;
    } else {
      this.ingredients.push(ingredient);
    }

    //this.ingredientsChanged.emit(this.ingredients.slice());
    this.ingredientsChanged.next(this.ingredients.slice());
  } */

  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.emitIngredientsChanged();
  }

  addIngredients(ingredients: Ingredient[]) {
    this.ingredients.push(...ingredients);
    this.emitIngredientsChanged();
  }

  updateIngredient(index: number, updatedIngredient: Ingredient) {
    this.ingredients[index] = updatedIngredient;
    this.emitIngredientsChanged();
  }

  deleteIngredient(index: number) {
    this.ingredients.splice(index, 1);
    this.emitIngredientsChanged();
  }
}
