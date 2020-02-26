import { Component } from '@angular/core';
import { ProductService } from './product.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'p-shop';

  constructor(private _service:ProductService){

  }

}
