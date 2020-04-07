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
  public id: number;
  private subscription:Subscription;
  public productForm = this.fb.group({
    title: ['',Validators.required],
    price: ['',Validators.required],
    category: ['',Validators.required],
    image_url: ['',Validators.required],
    stock: ['',Validators.required]
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
          this.productForm.controls['title'].setValue(this.products.title);
          this.productForm.controls['price'].setValue(this.products.price);
          this.productForm.controls['category'].setValue(this.products.category);
          this.productForm.controls['image_url'].setValue(this.products.image_url);
          this.productForm.controls['stock'].setValue(this.products.stock);
          this.setId(this.products.id);
        }else{
          this._router.navigate(["admin/products"]);
        }
      });
     
  }

  setId(id:number){
    this.id = id;
  }

  getId(){
    return this.id;
  }

  update(){
    const productObj = {
      id: this.getId(),
      category: this.productForm.value.category,
      image_url: this.productForm.value.image_url,
      price: this.productForm.value.price,
      title: this.productForm.value.title,
      stock: this.productForm.value.stock
    }
    this.subscription = this._service.updateProduct(productObj).subscribe(
      response => {
        console.log("response",response);
      });
  }
}
