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
  private register: boolean;
  private loginFlag: boolean = true;
  public invalidLogin: boolean;
  public message: string;
  public subscription:Subscription;
  constructor(private _service:AuthenticateService){ }

  ngOnInit() {
    this._service.invokPost().subscribe(
      response =>{
        console.log("adminResponse",response);
      });
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
          this._service.setAuthenticated(true);
          localStorage.setItem("Authorization","Basic " + btoa(this.loginForm.value.username+":"+this.loginForm.value.password));
        }
      },error=>{
        let err:any = error;
        if(err.error.message == "Unauthorized"){
          this._service.setAuthenticated(false);
          localStorage.removeItem("Authorization");
        }
      }
    )
  }

  invokPost(){
    this.subscription = this._service.invokPost().subscribe(
      response =>{
        console.log("adming***",response);
      }
    )
  }

}
