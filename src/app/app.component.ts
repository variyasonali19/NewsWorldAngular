import { Component } from '@angular/core';
import { Event,Router,NavigationStart,NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'vishal';
  public showLoadingIndicator : boolean;
  constructor(private _router : Router){
    this._router.events.subscribe((routerEvent : Event) =>
    {
      if(routerEvent  instanceof NavigationStart){
        this.showLoadingIndicator = true;
        // alert("showLoading indicator:" + this.showLoadingIndicator);
      }
      
      if(routerEvent  instanceof NavigationEnd){
        this.showLoadingIndicator = false;
        // alert(this.showLoadingIndicator);
      }
      });
    }
  }

