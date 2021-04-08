import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { authInterceptorProviders } from './_helpers/auth.interceptor';
import { AppEnv } from './_helpers/appenv';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { LoginComponent } from '@app/login/login.component';
import { DesktopComponent } from '@app/desktop/desktop.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DesktopComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
 
  ],
  providers: [authInterceptorProviders, AppEnv],
  bootstrap: [AppComponent]
})
export class AppModule { }









