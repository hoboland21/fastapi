
import { Injectable, SkipSelf } from '@angular/core';
import { Router } from '@angular/router';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map,tap } from 'rxjs/operators';
import { AppEnv } from '@app/_helpers/appenv';
import { IUser } from '@app/_interfaces/IUser';
import  jwt_decode  from "jwt-decode";

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }; 
 const httpNewOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded','accept':'application/json' })
  }; 
    

@Injectable({
  providedIn: 'root'
})

export class AuthService {

    private _isLoggedIn = new BehaviorSubject(!!this.getToken());
        
    isLoggedIn = this._isLoggedIn.asObservable();

//==================================
    constructor(   private router: Router, 
        private http: HttpClient ,
        private env: AppEnv ) 
        {  }

    private AUTH_API = this.env.API_URL
//==================================



//==================================
    getToken() {
        return  localStorage.getItem("token");
    }
//==================================
    changeLoggedIn(token:boolean) {
        this._isLoggedIn.next(token);
    }
//==================================
    private makeAuthHeader(usr:IUser) {
        return {
            headers: new HttpHeaders({ 
            'Content-Type': 'application/json' ,
            "Authorization": "Basic " + btoa(`${usr.username}:${usr.password}`) 
            })
        }
    }
//==================================
    public login(usr:any): Observable<any> {
        return this.http.post<any>(`${this.AUTH_API}/webtoken`, usr,httpOptions)       
    }
//==================================
    public logout() {
        localStorage.removeItem("token");
        this.changeLoggedIn(false)
        this.router.navigate(['login']);
    }
//==================================
    public getTokenRemainingTime() {
        const accessToken = localStorage.getItem('token');
        if (!accessToken) {
          return 0;
        }
        const jwtToken = JSON.parse(atob(accessToken.split('.')[1]));
        const expires = new Date(jwtToken.exp * 1000).getTime() - Date.now();
        const tkn = jwt_decode(accessToken)
        return { "time":expires,"token": tkn}
      }

}



    