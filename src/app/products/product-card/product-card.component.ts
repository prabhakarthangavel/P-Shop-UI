import { Component, OnInit, Input } from '@angular/core';
import { ProductInterface } from '../ProductInterface';
import { ProductService } from '../../product.service';
import { Router } from '@angular/router';
import { cart } from '../../models/shoppingCart.interface';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent implements OnInit {
  @Input('product')product: ProductInterface;
  public cart: Array<cart>;
  constructor(private _service: ProductService, private _router:Router) { 
  }

  ngOnInit() {
  }

  addToCart(){
    console.log("product",this.product);
    const auth = sessionStorage.getItem('Authenticated');
    if(auth == "true"){
      this._service.addToCart(this.product).subscribe(
        data=> {
          var quantity = 0;
          for(let i=0;i<data.cartProduct.length;i++){
            let value = data.cartProduct[i].quantity;
            quantity = quantity + value;
          }
          this._service.setProduct(data);
          this._service.changeCart(quantity);
      });
    }else{
      this._router.navigate(["/login"]);
    }
  }
  
}
