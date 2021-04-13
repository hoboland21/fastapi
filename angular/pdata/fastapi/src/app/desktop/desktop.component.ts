import { Component, OnInit, Input } from '@angular/core';
import { IUser } from '@app/_interfaces/IUser';
import { AuthService } from '@app/_services/auth.service';
import { UserService } from '@app/_services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { state } from '@angular/animations';

@Component({
  selector: 'app-desktop',
  templateUrl: './desktop.component.html',
  styleUrls: ['./desktop.component.css']
})
export class DesktopComponent implements OnInit {
  today = new Date()
  //  subscription : Subscription;
  isLoggedIn: boolean;
  username: string;
  user: IUser
  token_ttl: any
  token: any
  curr_user: IUser;
  router_state;
  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router,


  ) { }
  logOff() {
    this.authService.logout()
    this.router.navigate(['login']);
  }
  logOn() {
    this.router.navigate(['login']);
  }

  
  ngOnInit(): void {

    this.userService.getUser().subscribe(
      data => this.user = data
    )
    this.authService.isLoggedIn.subscribe(
      data=> {
        this.isLoggedIn = data;
      }
    ) 
  }

}

