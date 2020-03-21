import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError,of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {
  private loginUrl: string = "http://localhost:8080/auth/authentication";
  public username: string = "User Name";
  private storageSub= new Subject<string>();
  constructor(private _http:HttpClient) { }

  login(content): Observable<any> {
    let headers = new HttpHeaders();
    let username =  content.username;
    let password = content.password;
    headers = headers.append("Authorization", "Basic " + btoa(username+":"+password));
    headers = headers.append("Content-Type", "application/x-www-form-urlencoded");
    return this._http.get(this.loginUrl,{headers:headers});
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
