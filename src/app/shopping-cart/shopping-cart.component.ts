import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../product.service';
import { Subscription } from 'rxjs';
import { ProductInterface } from '../products/ProductInterface';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit   {
  public cart:any;
  public cart_total:number;
  constructor(public _service:ProductService) { }

  ngOnInit() {
    this._service.cartProduct$.subscribe(
      data=>{
        this.cart_total = 0;
        this.cart = data.cartProduct;
        for(let i=0;i<this.cart.length;i++){
          this.cart_total += this.cart[i].total_price;;
        }
        console.log("cartALLL",this.cart);
      }
    );
  }

  getDisable(total){
    if(total == 0){
      return true;
    }
  }
}
