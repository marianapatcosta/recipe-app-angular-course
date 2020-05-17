import { Component, HostListener, ElementRef, OnInit, OnDestroy } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy{
  /* @Output()
  activatedSection = new EventEmitter<string>();
  headerItems: string[] = ['Recipes', 'Shopping List'];*/
  isOpen: boolean;
  @HostListener('document:click', ['$event']) toggle(event){
    this.isOpen = this.elRef.nativeElement.contains(event.target) ? !this.isOpen : false;
  };

  isAuthenticated: boolean;
  private userSubscription: Subscription;
  /*onActivatedSection(item) {
    this.activatedSection.emit(item);
  }*/

  constructor(private elRef: ElementRef, private dataStorageService: DataStorageService, private authService: AuthService) { }

  ngOnInit() {
    this.userSubscription = this.authService.userSubj.subscribe(user => {
      this.isAuthenticated = !user ? false : true; // or !!user

    })
  }

  onSaveData() {
    this.dataStorageService.storeRecipes();
  }

  onFetchData() {
    this.dataStorageService.fetchRecipes().subscribe();
  }

  onLogout() {
    this.authService.logout();
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

}
