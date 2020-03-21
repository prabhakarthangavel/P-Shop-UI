import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticateService } from '../authenticate.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  public message: string;
  public warn: boolean = false;
  constructor(private _router: Router, private _auth: AuthenticateService) { }

  ngOnInit() {
  }

  registerForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    confirm_password: new FormControl('', Validators.required)
  });

  cancel() {
    this._router.navigate(['/authenticate']);
  }

  registerSubmit() {
    this.warn = false;
    this.message = ""
    console.log(this.registerForm.value.password,this.registerForm.value.confirm_password);
    if(this.registerForm.value.password != this.registerForm.value.confirm_password){
      this.warn = true;
      this.message = "Password and Confirm password must be same";
    }
    // this._auth.register(this.registerForm.value).subscribe(
    //   data => {
    //     this.registerForm.reset();
    //     console.log("Putdata", data);
    //     this.warn = true;
    //     this.message = data.status;
    //     if (data && data.status === "Success") {
    //       setTimeout(() => {
    //         this._router.navigate(['/authenticate']);
    //       },
    //         2000);
    //     }
    //   });
  }

}
