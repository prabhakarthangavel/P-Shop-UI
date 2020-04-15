import { Injectable, OnDestroy, ErrorHandler } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthenticateService } from '../auth/authenticate.service';
import { Subscription, Observable,  } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminGuardService implements CanActivate, OnDestroy {
  public state : boolean;
  private subscription:Subscription;
  constructor(private _auth:AuthenticateService) { }

  canActivate():boolean|Observable<boolean>{
    return this._auth.verifyAdmin().pipe(
      map(response=>{
        if(response.status ==200){
          return true;
        }
        return false;
      }));
    }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
