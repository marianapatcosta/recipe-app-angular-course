import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from "@angular/router";

const appRoutes: Routes = [
  {path: '', redirectTo: '/recipes', pathMatch: 'full'},
  {path: 'recipes', loadChildren: './recipes/recipes.module#RecipesModule'},
  {path: 'shopping-list', loadChildren: './shopping-list/shopping-list.module#ShoppingListModule'},
  {path: 'auth', loadChildren: './auth/auth.module#AuthModule'}
  // Angular 8 syntax; also needs to change  "module": "es2015" to "module": "esnext" in tsconfig.json file
  //{path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)}
];

@NgModule({
  imports: [
    // here we configure routerModule
    RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules})
    //RouterModule.forRoot(appRoutes, {useHash: true})
  ],
  //here we only export the module
  exports: [RouterModule]
})
export class AppRoutingModule {}
