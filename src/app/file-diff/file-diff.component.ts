import { Component, OnInit } from '@angular/core';
import { FileDiffService } from './file-diff.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-file-diff',
  templateUrl: './file-diff.component.html',
  styleUrls: ['./file-diff.component.scss']
})
export class FileDiffComponent implements OnInit {
  private leftArea: string = "test";
  private rightArea: string;
  private asyncString$: Observable<String>;

  constructor(private _service:FileDiffService) { }

  ngOnInit() {
    this.asyncString$ = this._service.getAsyncResponse();
  }

}
