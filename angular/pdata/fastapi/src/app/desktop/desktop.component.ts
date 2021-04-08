import { Component, OnInit, Input } from '@angular/core';
import { IUser } from '@app/_interfaces/IUser';
import { AuthService } from '@app/_services/auth.service';
import { UserService } from '@app/_services/user.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-desktop',
  templateUrl: './desktop.component.html',
  styleUrls: ['./desktop.component.css']
})
export class DesktopComponent implements OnInit {
  today = new Date()
//  subscription : Subscription;
  isLoggedIn: boolean;
  username:string;
  user:IUser
  token:any 
  constructor(
    private authService : AuthService,
    private userService : UserService,
    private router: Router,

  
  ) { }
  logOff() {
    this.authService.logout()
    this.router.navigate(['login']);

  }


  getUserList() {
    this.userService.getUserList().subscribe(
      data => console.log(data)
    )
  
  }
  ngOnInit(): void {
 
    this.token = this.authService.getToken()

    this.authService.isLoggedIn.subscribe(
        token => {
          if(token) {
            this.isLoggedIn = token;
           }
           else {
             this.router.navigate(['login'])
           }
        }
      )
  }
}



