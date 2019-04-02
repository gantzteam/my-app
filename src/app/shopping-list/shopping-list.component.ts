import { Component, OnInit } from '@angular/core'; // , OnDestroy
import { Store } from '@ngrx/store';
// import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/observable';

import { Ingredient } from '../shared/ingredient.model';
// import { ShoppingListService } from './shopping-list.service';
import * as fromShoppingList from './store/shopping-list.reducers';
import * as ShoppingListActions from './store/shopping-list.actions';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  // , OnDestroy
  shoppingListState: Observable<{ ingredients: Ingredient[] }>;
  // private subscription: Subscription;

  constructor(private store: Store<fromShoppingList.AppState>) {} //     // private slService: ShoppingListService,

  ngOnInit() {
    this.shoppingListState = this.store.select('shoppingList'); // this.slService.getIngredients();
    // this.subscription = this.slService.ingredientsChanged.subscribe(
    //   (ingredients: Ingredient[]) => {
    //     this.ingredients = ingredients;
    //   }
    // );
  }

  onEditItem(index: number) {
    // this.slService.startedEditing.next(index);
    this.store.dispatch(new ShoppingListActions.StartEdit(index));
  }

  // ngOnDestroy() {
  //   this.subscription.unsubscribe();
  // }
}
