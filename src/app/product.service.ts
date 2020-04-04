import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable, BehaviorSubject, ReplaySubject } from 'rxjs';
import { AuthenticateService } from './auth/authenticate.service';
import { ProductInterface } from './products/ProductInterface';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private allProducts: string = "http://localhost:8080/getAllProducts";
  private getCart: string = "http://localhost:8080/auth/getCart";
  private addCart: string = "http://localhost:8080/auth/addToCart";
  private deleteCart: string = "http://localhost:8080/auth/removeFromCart";
  private clear: string = "http://localhost:8080/auth/clearCart";
  private page: string = "http://localhost:8080/pagableProducts";
  private search: string = "http://localhost:8080/search";
  private edit: string = "http://localhost:8080/getProduct";
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
    return this._http.get(this.allProducts+"/"+path); 
  }

  getShoppingCart():Observable<any>{ 
    return this._http.get(this.getCart);
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
    return this._http.post(this.addCart,request);
  }

  removeCart(product:ProductInterface): Observable<any>{
    const request = {
      id: sessionStorage.getItem('Authorization'),
      title: product.title,
      image_url: product.image_url,
      price: product.price
    }
    return this._http.post(this.deleteCart,request);
  }

  clearCart(){
    return this._http.get(this.clear);
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
    return this._http.post(this.page,pages);
  }

  searchProduct(value):Observable<any>{
    return this._http.get(this.search+"/"+value);
  }

  editProduct(product):Observable<any>{
    return this._http.get(this.edit+"/"+product);
  }
}
