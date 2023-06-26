import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {

  constructor(private accountService : AccountService, private _snackBar: MatSnackBar, private router : Router){

  }
  loginForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  loginUser(){
    var loginData = this.loginForm.value;
    return this.accountService.loginUser(loginData).subscribe({
      next : response => {
        if(response){
          localStorage.setItem('useremail', response.toString());
          this.router.navigateByUrl('/');
        }
      },
      error : (fault) =>{
        if(fault){
          if(fault.error.status === 404){
            this._snackBar.open("User with the mail not found", "", {
              duration : 5000
            });
          }
          if(fault.error.status === 401){
            this._snackBar.open("User Credentials are not correct", "", {
              duration : 5000
            })
          }
        }
        else{
          this._snackBar.open(fault.message, "", {
            duration : 5000
          });
        }
      }
    })
  }
}
