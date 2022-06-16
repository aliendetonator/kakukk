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

  getLobby(id: string): Observable<any> {
    return this._http.get(`${this.apiUrl}?lobby=${id}`);
  }

  getLobbyByUsername(username: string): Observable<any> {
    return this._http.get(`${this.apiUrl}?user=${username}`);
  }

  joinLobby(id:string): Observable<any> {
    return this._http.get(`${this.apiUrl}/join?lobby=${id}`);
  }

  leaveLobby(data: any): Observable<any> {
    return this._http.post(`${this.apiUrl}/leave`, data);
  }

  createLobby(): Observable<any> {
    return this._http.get(`${this.apiUrl}/createLobby`);
  }
}
