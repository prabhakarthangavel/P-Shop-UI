import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../product.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, OnDestroy {
  public allProducts: Array<String>;
  public path: string;
  public cardEnable = true;
  private subscription: Subscription;

  constructor(private _service:ProductService, private _route:ActivatedRoute) {
    this.path = this._route.snapshot.paramMap.get('item');
   }

  ngOnInit() {
    this.subscription = this._service.getProducts(this.path).subscribe(
      data => {
        console.log("data",data);
        this.allProducts = data;
        });
  }

ngOnDestroy(){
  this.subscription.unsubscribe();
}
}
