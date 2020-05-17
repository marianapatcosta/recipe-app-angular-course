import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Recipe } from '../recipes/recipe.model';
import { RecipesService } from '../recipes/recipes.service';
import { map, tap, take, exhaustMap } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  constructor(private http: HttpClient, private recipesService: RecipesService, private authService: AuthService) { }

  storeRecipes() {
    const recipes = this.recipesService.getRecipes();
    // put overrides the previously saved recipes,according to the firebase API
    this.http.put('https://http-training-9588d.firebaseio.com/recipes.json', recipes)
    .subscribe(response => console.log(response));
  }

  fetchRecipes() {

      //return this.http.get<Recipe[]>('https://http-training-9588d.firebaseio.com/recipes.json?auth=' + user.token);
      return this.http.get<Recipe[]>('https://http-training-9588d.firebaseio.com/recipes.json')
      .pipe(
         map(recipes  => {
          return recipes.map((recipe: Recipe) => {
            return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []}
      })
    }),
        tap(recipes => {
          this.recipesService.setRecipes(recipes);
        }))

    // still subscribe a http observable because it was the last chained observable

    /* return this.http.get<Recipe[]>('https://http-training-9588d.firebaseio.com/recipes.json')
    .pipe(map(recipes=> {
      return recipes.map((recipe: Recipe) => {
          return {...recipe, ingredients: recipe.ingredients? recipe.ingredients : []}
      })
    }),
    tap(recipes => {
      this.recipesService.setRecipes(recipes);
    })
    )*/
  }
}
