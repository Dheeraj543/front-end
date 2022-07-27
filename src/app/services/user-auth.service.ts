import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserAuthService {
  constructor() {}

  public setToken(access_token: string) {
    localStorage.setItem('token', JSON.stringify(access_token));
  }

  public getToken(): string | null {
    return localStorage.getItem('token');
  }
  public clear() {
    localStorage.clear();
  }
  public isLoggedIn() {
    return this.getToken();
  }

  loggedIn = false;

  setLog(log: boolean) {
    this.loggedIn = log;
  }

  getLog() {
    return this.loggedIn;
  }
}
