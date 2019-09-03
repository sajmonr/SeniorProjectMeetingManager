import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../shared/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent{

  constructor(private router: Router, private auth: AuthService) { }

  onLogin(){
    this.auth.login().then((signedIn: boolean) => {
      if(signedIn)
        this.router.navigate(['/']);
    });
  }
}
