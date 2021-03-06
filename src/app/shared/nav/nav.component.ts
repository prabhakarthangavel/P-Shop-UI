import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../../product.service';
import { AuthenticateService } from '../../auth/authenticate.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit, OnDestroy {
  public login: boolean;
  public name: string =  "User name";
  public cartData:any;
  public cartCount: number;
  public subscription: Subscription;
  constructor(private _service:ProductService,public _auth:AuthenticateService,private _router:Router) {
    const authenticated = sessionStorage.getItem('Authenticated');
    if(authenticated == "true"){
      this.getCart();
    }
   }

  ngOnInit() {
    this.subscription = this._auth.watchStorage().subscribe(
      response => {
        if(response == "added"){
          this.getCart(); 
        }else{
          this.login = false;
          this.name = "User name";
        }
      }
    )
  }

  
  getCart(){
    this.login = true; 
    this.name = sessionStorage.getItem('username');  
    this.subscription =this._service.getShoppingCart().subscribe(
      response=>{
        var quantity = 0;
        if(response){
          for(let i=0;i<response.cartProduct.length;i++){
            let value = response.cartProduct[i].quantity;
            quantity = quantity + value;
          }
          this._service.setProduct(response);
          this._service.changeCart(quantity);
        }
      }); 
  }

  logout(){
    sessionStorage.clear();
    window.location.reload();
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
