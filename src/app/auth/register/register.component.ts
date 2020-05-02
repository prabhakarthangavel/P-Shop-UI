import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticateService } from '../authenticate.service';
import { NumericDirective } from '../../shared/numeric.directive';

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
    username: new FormControl('', [Validators.required, NumericDirective.space]),
    password: new FormControl('', Validators.required),
    confirm_password: new FormControl('', Validators.required)
  });

  cancel() {
    this._router.navigate(['/login']);
  }

  registerSubmit() {
    this.warn = false;
    this.message = ""
    if (this.registerForm.value.password != this.registerForm.value.confirm_password) {
      this.warn = true;
      this.message = "Password and Confirm password must be same";
    } else {
      this._auth.register(this.registerForm.value).subscribe(
        data => {
          console.log("data", data);
          this.registerForm.reset();
          if (data && data.status == 200) {
            this.message = data.body['status'];
            setTimeout(() => {
              this._router.navigate(['/login']);
            },
              2000);
          }
        },(error)=>{
          this.warn = true;
          this.message = error.error.errorMessage;
        });
    }
  }

}
