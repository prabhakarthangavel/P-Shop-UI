import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../product.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductInterface } from '../../products/ProductInterface';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {
  public path: string;
  public products: ProductInterface;
  public cardEnable: boolean;
  public responseStatus: boolean;
  private subscription:Subscription;
  public productForm = this.fb.group({
    title: ['',Validators.required],
    price: ['',Validators.required],
    category: ['',Validators.required],
    image_url: ['',Validators.required]
  });

  constructor(private _service:ProductService, private _route:ActivatedRoute, private _router:Router,
    private fb: FormBuilder) {
    this.path = this._route.snapshot.paramMap.get('product');
   }


  ngOnInit() {
    this.subscription = this._service.editProduct(this.path).subscribe(
      response =>{
        if(response && response.title != null){
          this.responseStatus = true;
          this.products = response;
        }else{
          this._router.navigate(["admin/products"]);
        }
      });
  }

}
