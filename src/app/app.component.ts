import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { LoggingService } from './logging.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'recipeApp';
  sectionToDisplay: string = 'Recipes';/*  */

  constructor(private authService: AuthService, private loggingService: LoggingService){}

  ngOnInit() {
    this.authService.autoLogin();
    this.loggingService.printLog('Hello from AppComponent')
  }

/*   showSection(event: string) {
    console.log(event)
    this.sectionToDisplay = event;
    console.log(this.sectionToDisplay)
  } */
}
/*  */
