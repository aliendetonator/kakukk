import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private _http: HttpClient) {}

  //frontend-backend kapcsolat létrehozása

  apiUrl = 'http://localhost:3000/api';

  // login
  login(data: any): Observable<any> {
    return this._http.post(`${this.apiUrl}/user/login`, data);
  }

  //register
  register(data: any): Observable<any> {
    return this._http.post(`${this.apiUrl}/user/register`, data);
  }

  //leaderboard
  leaderboard(data: any): Observable<any> {
    return this._http.post(`${this.apiUrl}/leaderboard`, data);
  }

  getUser(): Observable<any> {
    return this._http.get(`${this.apiUrl}/user`);
  }

  statistics(data:any): Observable<any> {
    return this._http.post(`${this.apiUrl}/statistics`, data);
  }

}
