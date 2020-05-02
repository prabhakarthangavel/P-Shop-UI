import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { HttpEvent, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { MOCKAPI } from './../shared/MOCKAPI.const';
import { API } from './../shared/API.const';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {
  public username: string = "User Name";
  public admin: boolean;
  private storageSub= new Subject<string>();
  constructor(private _http:HttpClient, private _router:Router) { }

  login(content): Observable<any> {
    let headers = new HttpHeaders();
    let data = {
      username : content.username,
      password : content.password
    }
    let username =  content.username;
    let password = content.password;
    headers = headers.append("Authorization", "Basic " + btoa(username+":"+password));
    headers = headers.append("Content-Type", "application/json");
    return this._http.post(MOCKAPI.loginUrl,data,{headers:headers});
  }

  watchStorage(): Observable<any> {
    return this.storageSub.asObservable();
  }

  setItem(key: string, data: any) {
    sessionStorage.setItem(key, data);
    this.storageSub.next('added');
  }

  removeItem(key) {
    sessionStorage.removeItem(key);
    this.storageSub.next('removed');
  }

  setadminStatus(value:boolean){
    this.admin = value;
  }

  getadminStatus():boolean{
    return this.admin;
  }
  
  verifyAdmin(){
    return this._http.get(MOCKAPI.adminCheck,{observe : 'response'}).pipe(
      tap((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          return event;
        }
      },(err: any) => {
      if (err instanceof HttpErrorResponse) {
        if (err.status === 403) {
         this.handleError(err);
         this._router.navigate(['forbidden']);
        }
      }
    }));
  }

  register(data){
    const registerForm = {
      username: data.username,
      password: data.password,
      roles:[{
        role: "USER"
      }]
    }
    return this._http.post(MOCKAPI.register,registerForm,{observe:'response'});
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };
}
