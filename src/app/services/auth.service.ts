import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private BASE_URL: string = 'http://localhost:8400/';
  requestHeader = new HttpHeaders({
    'No-Auth': 'True',
  });

  constructor(private http: HttpClient) {}

  public login(loginData: any) {
    return this.http.post<any>(this.BASE_URL + 'login', loginData, {
      headers: this.requestHeader,
    });
  }
}
