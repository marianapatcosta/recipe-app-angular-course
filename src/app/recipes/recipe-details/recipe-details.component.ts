import { Component,  ElementRef, OnInit, Input, HostListener, EventEmitter } from '@angular/core';
import { Recipe } from '../recipe.model';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from 'src/app/shopping-list/shopping-list.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipesService } from '../recipes.service';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css']
})
export class RecipeDetailsComponent implements OnInit {
  recipe: Recipe;
  id: number;
  isOpen: boolean;
  @HostListener('document:click', ['$event']) toggle(event){
    this.isOpen = this.elRef.nativeElement.contains(event.target) ? !this.isOpen : false;
  }

  constructor(private elRef: ElementRef,
    private shoppingListService: ShoppingListService,
    private route: ActivatedRoute,
    private recipeService: RecipesService,
    private router: Router ) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
    this.id = +params['id'];
    this.recipe = this.recipeService.getRecipeById(this.id);
   });

  }

  onShoppingIngredients() {
    this.shoppingListService.addIngredients(this.recipe.ingredients);
  }

  onEditRecipe() {
    this.router.navigate(['edit'], {relativeTo: this.route});
    //this.router.navigate(['../', this.id, 'edit'], {relativeTo: this.route});
  }

  onDeleteRecipe() {
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['/recipes']);
  }
}
