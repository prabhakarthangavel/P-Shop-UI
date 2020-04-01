import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProductService } from '../../product.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  public subscription: Subscription;
  constructor(private _service:ProductService) { }

  ngOnInit() { 
  }

  clearCart(){
    this._service.clearCart().subscribe(
      data => {
        this._service.setProduct(data);
        this._service.changeCart(data['cartProduct'].length);
      });
  }

}
