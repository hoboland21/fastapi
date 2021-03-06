import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import {  FormGroup, FormControl } from '@angular/forms';
import { IUser }  from '@app/_interfaces/IUser';
import { Router, ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formdata;
  user : IUser


  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    ) { }

  ngOnInit(): void {
    this.authService.isLoggedIn.subscribe(
      data=>{
        if(data) {
          this.router.navigate(['desktop'])
        }
      }
    )    
    this.formdata = new FormGroup({
      username: new FormControl(''),
      password: new FormControl('')

    });
  }

  register() {
    this.router.navigate(['register']);

  }

  forgot() {

  }

  
  onSubmit(data) {
    this.authService.login(data)
      .subscribe(
         (data) => { 
          localStorage.setItem('token',data.access_token);
          console.log(localStorage.getItem('token'))
          this.authService.changeLoggedIn(true);
          this.router.navigate(['desktop']);

        
      })
    }
  } 
  


  

