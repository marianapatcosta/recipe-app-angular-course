import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('shoppingForm', {static: false}) shoppingForm: NgForm;
/*   @ViewChild('nameInput', {static: false}) nameInputRef: ElementRef;
  @ViewChild('amountInput', {static: false}) amountInputRef: ElementRef; */

  subscription: Subscription;
  editMode: boolean;
  editedItemIndex: number;
  editedItem: Ingredient;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit() {
    this.subscription = this.shoppingListService.startEditing.subscribe((index: number) => {
      this.editMode = true;
      this.editedItemIndex = index;
      this.editedItem = this.shoppingListService.getIngredient(index);
      this.shoppingForm.setValue({
        name: this.editedItem.name,
        amount: this.editedItem.amount
      });
    });
  }

  onAddOrUpdateIngredient() {
/*       const ingName = this.nameInputRef.nativeElement.value.toLowerCase();
      const ingAmount = Number(this.amountInputRef.nativeElement.value);
      const newIngredient = new Ingredient (ingName, ingAmount);
      this.shoppingListService.addIngredient(newIngredient); */
      const newIngredient = new Ingredient(this.shoppingForm.value.name, this.shoppingForm.value.amount);

      this.editMode ? this.shoppingListService.updateIngredient(this.editedItemIndex, newIngredient) :
                      this.shoppingListService.addIngredient(newIngredient);

      this.shoppingForm.reset();
      this.editMode = false;
  }

  onClear() {
    this.shoppingForm.reset();
    this.editMode = false;
  }

  onDeleteIngredient() { 
    this.shoppingListService.deleteIngredient(this.editedItemIndex);
    this.onClear();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
