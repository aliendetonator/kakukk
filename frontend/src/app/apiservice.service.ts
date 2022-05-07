import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {

  constructor(private _http:HttpClient) { }

  //frontend-backend kapcsolat létrehozása

  apiUrl='http://localhost:3000/user';

  //minden adat kiszedése
  getAllData():Observable<any>
  {
    return this._http.get(`${this.apiUrl}`)
  }
}
