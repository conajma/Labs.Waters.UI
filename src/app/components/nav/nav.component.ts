import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent  implements OnInit{

  userLoggedIn : boolean = false;
  userEmail! : string;

  constructor(public accountService : AccountService, private router : Router){

  }
  ngOnInit() {
    var email = localStorage.getItem('useremail');
    if(email){
      this.userEmail = email;
    }
  }

  logoutUser(){
    this.accountService.logout();
    this.router.navigateByUrl('/');
  }

}
