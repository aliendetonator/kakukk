import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  getUserDetails() {
    return localStorage.getItem('userDetails') ?? null;
  }
  setUserData(res: any) {
    this.setDataInLocalStorage(
      'userData',
      JSON.stringify(res.data)
    );
    console.log(res.token)
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
