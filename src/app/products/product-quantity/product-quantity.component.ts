import { Component, OnInit, Input } from '@angular/core';
import { ProductService } from '../../product.service';
import { ProductInterface } from '../ProductInterface';

@Component({
  selector: 'app-product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.scss']
})
export class ProductQuantityComponent implements OnInit {
  @Input('product')product: ProductInterface;
  constructor(private _service:ProductService) { }

  ngOnInit() {
  }

  addToCart(){
    this._service.addToCart(this.product.title).subscribe(
      data=> {
        var quantity = 0;
        for(let i=0;i<data.cartProduct.length;i++){
          let value = data.cartProduct[i].quantity;
          quantity = quantity + value;
        }
        this._service.setProduct(data);
        this._service.changeCart(quantity);
    });
  }

  removeFromCart(){
    this._service.removeCart(this.product.title).subscribe(
      data=> {
        var quantity = 0;
        for(let i=0;i<data.cartProduct.length;i++){
          let value = data.cartProduct[i].quantity;
          quantity = quantity + value;
        }
        this._service.setProduct(data);
        this._service.changeCart(quantity);
    });
  }
}
