import { Directive, HostListener, HostBinding, Input } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})

export class DropdownDirective {

  @HostBinding('class.show') isOpen: boolean = false;


  @HostListener('click') toggleOpen(eventData: Event) {
    this.isOpen = !this.isOpen;

  }
}
