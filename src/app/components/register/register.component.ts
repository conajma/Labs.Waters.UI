import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Route, Router } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  constructor(
    private accountService: AccountService,
    private _snackBar: MatSnackBar,
    private route: Router
  ) {}
  registerData: any;

  registerForm = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    confirmPassword: new FormControl('', Validators.required),
  });

  registerUser() {
    if (this.registerForm.status === 'VALID') {
      this.registerData = this.registerForm.value;
      this.accountService.registerUser(this.registerData).subscribe({
        next: (response) => {
          if (response) {
            let snackbarRef = this._snackBar.open(
              'User Registered Successfully',
              'Login',
              {
                duration: 5000,
              }
            );
            snackbarRef.afterDismissed().subscribe(() => {
              this.route.navigateByUrl('/login');
            });
            this.registerForm.reset();
          }
        },
      });
    }
  }
}
