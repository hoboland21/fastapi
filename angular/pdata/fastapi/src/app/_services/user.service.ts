import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { IUser } from '@app/_interfaces/IUser';
import { AppEnv } from '@app/_helpers/appenv';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class UserService {

  //==================================
  constructor(
    private router: Router,
    private http: HttpClient,
    private env: AppEnv) { }

    private API_URL = this.env.API_URL
  //==================================

  getUserList(): Observable<any[]> {
    const staffURL = `${this.API_URL}/users/me`
    return this.http.get<any[]>(staffURL)
  }




}



