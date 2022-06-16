import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  constructor(private _http: HttpClient) { }
  
  apiUrl = 'http://localhost:3000/api/game';
  
  getChanges(data: any): Observable<any> {
    return this._http.post(`${this.apiUrl}`, data);
  }

  getLobby(data?: any): Observable<any> {
    data = data ?? {};
    var urlToGet=`${this.apiUrl}?`;
    for (const [key, value] of Object.entries(data)) {
      this.apiUrl += `${key}=${value}&`;
    }
    return this._http.get(urlToGet);
  }

  joinLobby(): Observable<any> {
    return this._http.get(`${this.apiUrl}/join`);
  }

  leaveLobby(): Observable<any> {
    return this._http.get(`${this.apiUrl}/leave`);
  }

  createLobby(): Observable<any> {
    return this._http.get(`${this.apiUrl}/createLobby`);
  }
}
