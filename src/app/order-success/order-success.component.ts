import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
@Component({
  selector: 'app-order-success',
  templateUrl: './order-success.component.html',
  styleUrls: ['./order-success.component.scss']
})
export class OrderSuccessComponent implements OnInit {

  constructor(private _service:ProductService) { }

  ngOnInit() {
  }

}
