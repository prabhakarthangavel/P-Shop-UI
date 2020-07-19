import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FileDiffService {

  constructor(private _http:HttpClient) { }

  getAsyncResponse():Observable<String>{ 
    return this._http.get<String>("http://localhost:8080/asyncTest");
  }
}
