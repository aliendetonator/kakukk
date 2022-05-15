import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private _http:HttpClient) { }

  //frontend-backend kapcsolat létrehozása

  apiUrl='http://localhost:3000';

  //minden adat kiszedése a felhasználóból
  getAllData():Observable<any>
  {
    // return this._http.get(`${this.apiUrl}/user`, {withCredentials: true});
    return this._http.get(`${this.apiUrl}/user`); 
  }

  //adat kreálás

  createData(data:any):Observable<any>
  {
    // return this._http.post(`${this.apiUrl}/register`, data, {withCredentials: true});
    return this._http.post(`${this.apiUrl}/register`, data);
  }
}
