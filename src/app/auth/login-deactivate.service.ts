import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginDeactivateService implements CanActivate {

  constructor() { }

  canActivate():boolean{
    if(sessionStorage.getItem('Authenticated') == "true"){
      return false;
    }
    return true;
  }
}
