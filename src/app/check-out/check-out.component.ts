import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { FormBuilder, Validators } from '@angular/forms';
import { NumericDirective } from '../shared/numeric.directive';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.scss']
})
export class CheckOutComponent implements OnInit {
  public cart_total: number;
  public cart: any;
  public cartForm = this.fb.group({
    name: ['',Validators.required],
    address: this.fb.group({
      street: ['',Validators.required],
      city: ['',Validators.required],
      state: ['',Validators.required],
      zip: ['',[Validators.required,NumericDirective.numeric]]
    }),
    mobile:['',Validators.required]
  });

  constructor(private _service:ProductService, private fb: FormBuilder) { 
  
  }

  ngOnInit() {
    this._service.cartProduct$.subscribe(
      data=>{
        this.cart_total = 0;
        this.cart = data.cartProduct;
        console.log("data",this.cart);
        for(let i=0;i<this.cart.length;i++){
          this.cart_total += this.cart[i].total_price;;
        }
      }
    );
  }

  update(){
    console.log("form value",this.cartForm.value);
  }

}
