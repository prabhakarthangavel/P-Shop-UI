import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable, BehaviorSubject, ReplaySubject } from 'rxjs';
import { AuthenticateService } from './auth/authenticate.service';
import { ProductInterface } from './products/ProductInterface';
import { MOCKAPI } from './shared/MOCKAPI.const';
import { API } from './shared/API.const';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private _navItemSource = new BehaviorSubject<number>(0);
  public cartProducts = new ReplaySubject<any>(null);
  constructor(private _http:HttpClient,private _auth:AuthenticateService) { 
  }

  public cartItem$ = this._navItemSource.asObservable();
  public cartProduct$ = this.cartProducts.asObservable();

  //Cart Quantity
  changeCart(number) {
    this._navItemSource.next(number);
  }

  getProducts(path):Observable<any>{
    const param:HttpParams = new HttpParams().set('product',path);
    return this._http.get(MOCKAPI.allProducts+"/"+path); 
  }

  getShoppingCart():Observable<any>{ 
    return this._http.get(MOCKAPI.getCart);
  }

  //Cart Products
  setProduct(products){
    console.log("setproduct",products);
    this.cartProducts.next(products);
  }

  addToCart(product:ProductInterface):Observable<any>{
    const request = {
      id: sessionStorage.getItem('Authorization'),
      title: product.title,
      image_url: product.image_url,
      price: product.price
    }
    return this._http.post(MOCKAPI.addCart,request);
  }

  removeCart(product:ProductInterface): Observable<any>{
    const request = {
      id: sessionStorage.getItem('Authorization'),
      title: product.title,
      image_url: product.image_url,
      price: product.price
    }
    return this._http.post(MOCKAPI.deleteCart,request);
  }

  clearCart(){
    return this._http.get(MOCKAPI.clear);
  }

  getQuantity(product){
    if(!sessionStorage.getItem('Authenticated') || sessionStorage.getItem('Authenticated') == 'false'){
      return 0;
    }; 
    var quantity = 0;
    this.cartProduct$.subscribe(
      data=>{      
        for(let i=0;i<data.cartProduct.length;i++){
          if(product == data.cartProduct[i].title){
            quantity =  data.cartProduct[i].quantity;
          }
        }  
  });
  return quantity;
  }

  getPageable(page){
    const pages = {
      page:page,
      count: 8
    }
    return this._http.post(MOCKAPI.page,pages);
  }

  searchProduct(value):Observable<any>{
    return this._http.get(MOCKAPI.search+"/"+value);
  }

  editProduct(product):Observable<any>{
    return this._http.get(MOCKAPI.edit+"/"+product);
  }

  updateProduct(product):Observable<any>{
    return this._http.post(MOCKAPI.update,product);
  }
}
