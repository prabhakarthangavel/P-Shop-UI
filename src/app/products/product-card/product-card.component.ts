import { Component, OnInit, Input } from '@angular/core';
import { ProductInterface } from '../ProductInterface';
import { ProductService } from '../../product.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent implements OnInit {
  @Input('product')product: ProductInterface;
  constructor(private _service: ProductService) { 
    this._service.sub.subscribe(
      data => {
        console.log("inside product card comp",data);
      });
  }

  ngOnInit() {
   
  }

  addToCart(){
    console.log(this.product);
  }
}
