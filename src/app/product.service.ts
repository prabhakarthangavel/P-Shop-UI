import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private allProducts: string = "http://localhost:8080/getAllProducts";
  private getCart: string = "http://localhost:8080/auth/getCart";
  constructor(private _http:HttpClient) { 
  }

  getProducts(path):Observable<any>{
    const param:HttpParams = new HttpParams().set('product',path);
    return this._http.get(this.allProducts+"/"+path); 
  }

  getShoppingCart():Observable<any>{ 
    return this._http.get(this.getCart);
  }

}
