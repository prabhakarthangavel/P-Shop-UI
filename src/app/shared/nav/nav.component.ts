import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../product.service';
import { AuthenticateService } from '../../auth/authenticate.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  public login: boolean;
  public name: string =  "User name";
  constructor(private _service:ProductService,private _auth:AuthenticateService) {
    const authenticated = sessionStorage.getItem('Authenticated');
    if(authenticated == "true"){
      this.login = true;
      this.name = sessionStorage.getItem('username');
    }
   }

  ngOnInit() {
    this._service.getShoppingCart().subscribe();
    this._auth.watchStorage().subscribe(
      response => {
        if(response == "added"){
          this.login = true; 
          this.name = sessionStorage.getItem('username');
        }else{
          this.login = false;
          this.name = "User name";
        }
      }
    )
  }

}
