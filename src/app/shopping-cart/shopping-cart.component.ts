import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {

  constructor(private _service:ProductService) { }

  ngOnInit() {
    this._service.cartProduct$.subscribe(
      data=>{
        console.log("initial",data);
      }
    )
  }

}
