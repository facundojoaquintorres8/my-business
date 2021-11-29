import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {LoginComponent} from "./login.component";
import { CommonModule } from '@angular/common';
import {SharedModule} from '../shared/shared.module';
//import { AppRoutingModule } from './app-routing.module'; // ensures the application have routing capabilities
//import { AppComponent } from './app.component'; // made present for bootstrapping application on the launch
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http'; // enables the application to communicate with the backend services
import { AuthService } from './auth.service';
import {RouterModule} from "@angular/router";
import {authRoute} from "./auth.route"; // this will allow the app to automatically attach authorization information to requests
//import { HomeComponent } from './home/home.component'; // implements the home route

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    //BrowserModule,
    HttpClientModule,
    RouterModule.forChild(authRoute)
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthService, multi: true }
  ],
})
export class AuthModule { }
