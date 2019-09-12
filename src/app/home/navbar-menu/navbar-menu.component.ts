import { Component } from '@angular/core';
import {AuthService} from '../../shared/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-navbar-menu',
  templateUrl: './navbar-menu.component.html',
  styleUrls: ['./navbar-menu.component.less']
})
export class NavbarMenuComponent {

  isExpanded = false;

  constructor(private auth: AuthService, private router: Router){}

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }

  private onLogout(){
    this.auth.logout().then(success => {
      if(success)
        this.router.navigate(['/account']);
    })
  }

  private capitalizeFirstLetter(value: string){
    return value.charAt(0).toUpperCase() + value.slice(1);
  }
}
