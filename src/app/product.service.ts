import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable, BehaviorSubject, ReplaySubject } from 'rxjs';
import { AuthenticateService } from './auth/authenticate.service';
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private allProducts: string = "http://localhost:8080/getAllProducts";
  private getCart: string = "http://localhost:8080/auth/getCart";
  private addCart: string = "http://localhost:8080/auth/addToCart";
  private _navItemSource = new BehaviorSubject<number>(0);
  constructor(private _http:HttpClient,private _auth:AuthenticateService) { 
  }

  public cartItem$ = this._navItemSource.asObservable();

  changeCart(number) {
    this._navItemSource.next(number);
  }

  getProducts(path):Observable<any>{
    const param:HttpParams = new HttpParams().set('product',path);
    return this._http.get(this.allProducts+"/"+path); 
  }

  getShoppingCart():Observable<any>{ 
    return this._http.get(this.getCart);
  }

  addToCart(product):Observable<any>{
    const request = {
      id: sessionStorage.getItem('Authorization'),
      product: product
    }
    return this._http.post(this.addCart,request);
  }

}
