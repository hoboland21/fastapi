import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from '@app/login/login.component';
import { RegisterComponent } from '@app/login/register/register.component';
import { DesktopComponent } from './desktop/desktop.component';
const appRoutes: Routes = [
  { path: 'desktop', component: DesktopComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '', component: LoginComponent },

];


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes,
      { onSameUrlNavigation:'reload'}),

 
  ],
  exports: [
    RouterModule
  ]

})
export class AppRoutingModule { }




