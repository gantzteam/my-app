import {
  HttpClient,
  HttpHeaders,
  HttpParams,
  HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
// import { Response } from '@angular/http'; // Http,
import 'rxjs/Rx';

import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class DataStorageService {
  constructor(
    private httpClient: HttpClient, // private http: Http,
    private recipeService: RecipeService,
    private authService: AuthService
  ) {}

  storeRecipes() {
    // const token = this.authService.getToken(); // use interceptor

    // const headers = new HttpHeaders().set(
    //   'Authorization',
    //   'Bearer assdfsdgdfgsadsaf'
    // );
    // ?auth=' + token
    // return this.httpClient.put(
    //   'https://ng-recipe-book-b5ef4.firebaseio.com/recipes.json',
    //   this.recipeService.getRecipes(),
    //   {
    //     observe: 'body',
    //     params: new HttpParams().set('auth', token)
    //     // headers: headers
    //   }
    // );
    const req = new HttpRequest(
      'PUT',
      'https://ng-recipe-book-b5ef4.firebaseio.com/recipes.json',
      this.recipeService.getRecipes(),
      { reportProgress: true } // , params: new HttpParams().set('auth', token) // use interceptor
    );
    return this.httpClient.request(req);
  }

  getRecipes() {
    // const token = this.authService.getToken(); // use interceptor
    // auth=' + token
    this.httpClient
      .get<Recipe[]>(
        'https://ng-recipe-book-b5ef4.firebaseio.com/recipes.json',
        {
          observe: 'body',
          responseType: 'json'
          // params: new HttpParams().set('auth', token) // use interceptor
        }
      )
      .map(recipes => {
        // .map((response: Response) => {
        // const recipes: Recipe[] = response.json();
        for (const recipe of recipes) {
          if (!recipe['ingredients']) {
            recipe['ingredients'] = [];
          }
        }
        return recipes;
      })
      .subscribe((recipes: Recipe[]) => {
        this.recipeService.setRecipes(recipes);
      });
  }
}
