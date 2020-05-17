import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appPlaceholder]'
})
export class PlaceholderDirective {

  // allows to publicly access the viewContainerRef, which is a pointer to access a place in theDOM where th directive will be added and create something there
  constructor(public viewContainerRef: ViewContainerRef ) {}

}
