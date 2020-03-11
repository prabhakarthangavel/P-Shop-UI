import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpResponse }from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>,next: HttpHandler): Observable<HttpEvent<any>> {
    const authCode = localStorage.getItem("Authorization");
    if(authCode != null){
      const duplicate = req.clone({setHeaders: {Authorization: authCode}});
      return next.handle(duplicate);
    }else{
      return next.handle(req);
    }
    }
}