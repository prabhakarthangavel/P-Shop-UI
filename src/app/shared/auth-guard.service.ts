import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private _route:Router) { }

  canActivate():boolean{
    const auth = sessionStorage.getItem('Authenticated');
    if(!auth || auth == 'false'){
      this._route.navigate(['login']);
      return false;
    }
    return true;
  }
}
