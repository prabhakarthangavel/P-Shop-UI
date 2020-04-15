import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router/src/utils/preactivation';

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
