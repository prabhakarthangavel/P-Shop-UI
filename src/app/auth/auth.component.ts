import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticateService } from './authenticate.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  public invalidLogin: boolean;
  public message: string;
  public subscription:Subscription;
  constructor(private _service:AuthenticateService,private _router:Router){ }

  ngOnInit() {
  }

  loginForm = new FormGroup({
    username: new FormControl('',Validators.required),
    password: new FormControl('',Validators.required)
  });

  loginSubmit(){
     this._service.login(this.loginForm.value).subscribe(
      response =>{
        let data:any = response;
        if(data.status == "Authenticated"){
          sessionStorage.setItem("Authenticated","true");
          sessionStorage.setItem("Authorization","Basic " + btoa(this.loginForm.value.username+":"+this.loginForm.value.password));
          this._service.setItem("username",this.loginForm.value.username);
          this._router.navigate(["/products"]);
          if(response.role == "ADMIN"){
            this._service.setadminStatus(true);
          }else{
            this._service.setadminStatus(false);
          }
        }
      },error=>{
        let err:any = error;
        this.invalidLogin = true;
        this.message = err.error.message;
        if(err.error.message == "Unauthorized"){
          sessionStorage.setItem("Authenticated","false");
          sessionStorage.removeItem("Authorization");
          this._service.removeItem("username");
          this._service.setadminStatus(false);
        }
      }
    )
  }

}
