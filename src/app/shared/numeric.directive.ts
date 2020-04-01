import { Directive } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';

@Directive({
  selector: '[appNumeric]'
})
export class NumericDirective {
  static numeric(control: AbstractControl): {[key:string]:any} | null {
    let val = control.value;
    var numbers = /^[0-9]+$/;

    if(!val.match(numbers)) 
      return { 'numeric': true};
    
      return null;
  } 
}
 