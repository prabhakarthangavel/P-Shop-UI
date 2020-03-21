import { Component, OnInit, Input } from '@angular/core';
import { ProductInterface } from '../ProductInterface';
import { ProductService } from '../../product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent implements OnInit {
  @Input('product')product: ProductInterface;
  constructor(private _service: ProductService, private _router:Router) { 
  }

  ngOnInit() {
  }

  addToCart(){
    const auth = sessionStorage.getItem('Authenticated');
    if(auth == "true"){
      
    }else{
      this._router.navigate(["/login"]);
    }
  }
}
