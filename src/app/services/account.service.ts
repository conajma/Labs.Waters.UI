import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReplaySubject, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  baseUrl: string = 'https://localhost:7066/api/';
  private currentUserSource = new ReplaySubject<any>(1);
  currentUser$ = this.currentUserSource.asObservable();

  constructor(private http: HttpClient) {}

  registerUser(userData: any) {
    return this.http.post(this.baseUrl + 'Register/adduser', userData);
  }

  loginUser(loginData : any){
    return this.http.post(this.baseUrl + 'Account/login', loginData).pipe(
      map((response : any) =>{
        const user = response;
        if(user){
          this.setCurrentUser(user);
        }
        return user;
      })
    )
  }

  logout(){
    localStorage.removeItem('useremail');
    this.currentUserSource.next(null!);
  }


  setCurrentUser(user : any){
    localStorage.setItem('useremail', JSON.stringify(user));
    this.currentUserSource.next(user);
  }
}
