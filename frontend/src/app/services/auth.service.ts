import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  getUserDetails() {
    const userData = localStorage.getItem('userData');
    if (userData !== null && userData !== undefined){ 
      return JSON.parse(userData);
    }
    return null;
  }
  setUserData(res: any) {
    this.setDataInLocalStorage(
      'userData',
      JSON.stringify(res.data)
    );
    this.setDataInLocalStorage('token', res.token);
  }
  setDataInLocalStorage(varname: string, data: any) {
    localStorage.setItem(varname, data);
  }
  getToken() {
    return localStorage.getItem('token') ?? null;
  }
  clearStorage() {
    localStorage.clear();
  }
}
