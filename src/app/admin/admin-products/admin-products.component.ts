import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Subject } from 'rxjs';
import { ProductService } from '../../product.service';
import { ProductInterface } from '../../products/ProductInterface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.scss']
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  public subscription: Subscription;
  public products: any;
  public page: number = 0;
  public index = 0;
  public search: boolean;
  public searchList: Array<ProductInterface>[];
  constructor(private _service:ProductService, private _route:Router) { }

  ngOnInit() {
    this.navigate();
  }

  navigate(nav?){
    if(nav == 'previous'){
      this.page --;
    }else if(nav == 'next'){
      this.page ++;
    }
    this.subscription = this._service.getPageable(this.page).subscribe(
      response =>{
        this.products = response;
      });
  }

  searchProduct(value) {
    if(value){
      this.subscription = this._service.searchProduct(value).subscribe(
        response => {
          if(response){
            this.search = true;
            this.searchList = response;
          }
        }
      );
    }else{
      this.search = false; 
    }
  } 

  edit(product:string){
    this._route.navigate(["/admin/products/"+product.toLocaleLowerCase()]);
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
