// the modules required by the app are imported here
import { BrowserModule } from '@angular/platform-browser'; // this ensures the application will run on the browser
import { NgModule } from '@angular/core';

//import { AppRoutingModule } from './app-routing.module'; // ensures the application have routing capabilities

//import { AppComponent } from './app.component'; // made present for bootstrapping application on the launch

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http'; // enables the application to communicate with the backend services
import { AuthInterceptorService } from './auth-interceptor.service'; // this will allow the app to automatically attach authorization information to requests
//import { HomeComponent } from './home/home.component'; // implements the home route

@NgModule({
  declarations: [  /*
  ACA VAN LOS COMPONENTES ENTRE LOS QUE ME MUEVA CUANDO VALIDE
  */
  ],
  imports: [
    BrowserModule,


    HttpClientModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true }
  ],
})
export class AppModule { }
