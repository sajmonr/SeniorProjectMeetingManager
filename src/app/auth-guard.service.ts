import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from './shared/auth.service';

@Injectable()
export class AuthGuard implements CanActivate{
  constructor(private router: Router, private auth: AuthService){}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.auth.isAuthenticated().then((authenticated: boolean) => {
      if(authenticated){
        return true;
      }else{
        this.router.navigate(['/account']);
      }
    })
  }

}
