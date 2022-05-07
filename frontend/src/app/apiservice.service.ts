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

  //minden adat kiszedése a felhasználóból
  getAllData():Observable<any>
  {
    return this._http.get(`${this.apiUrl}`)
  }

  //adat kreálás

  createData(data:any):Observable<any>
  {
    return this._http.post(`${this.apiUrl}`,data)
  }
}
