import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  baseUrl: string = 'https://localhost:7066/api/';

  constructor(private http: HttpClient) {}

  registerUser(userData: any) {
    return this.http.post(this.baseUrl + 'Register/adduser', userData);
  }

  loginUser(loginData : any){
    return this.http.post(this.baseUrl + 'Account/login', loginData)
  }
}
