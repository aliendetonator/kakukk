import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  constructor(private _http: HttpClient) { }
  
  apiUrl = 'http://localhost:3000/api/game';

  getLobby(id: string): Observable<any> {
    return this._http.get(`${this.apiUrl}?lobby=${id}`);
  }

  getLobbyByUsername(username: string): Observable<any> {
    return this._http.get(`${this.apiUrl}?user=${username}`);
  }

  joinLobby(data: any): Observable<any> {
    return this._http.post(`${this.apiUrl}/join`, data);
  }

  leaveLobby(data: any): Observable<any> {
    return this._http.post(`${this.apiUrl}/leave`, data);
  }

  getChanges(data: any): Observable<any> {
    return this._http.post(`${this.apiUrl}`, data);
  }
}
