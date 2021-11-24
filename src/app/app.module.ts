import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { PublicLayoutComponent } from './layout/public/public-layout.component';
import {PrivateLayoutComponent} from './layout/private/private-layout.component';
import { NavbarComponent } from './layout/navbar/navbar.component';
import {AuthGuards} from "./security/auth-guards";
import {TokenInterceptor} from "./security/token-interceptor";
import {ToastComponent} from "./toast/toast.component";

const APP_CONTAINERS = [

]

@NgModule({
  declarations: [
    AppComponent,
    PublicLayoutComponent,
    PrivateLayoutComponent,
    NavbarComponent,
    HomeComponent,
    ToastComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FontAwesomeModule,
  ],
  exports: [ToastComponent],
  providers: [{
                provide: HTTP_INTERCEPTORS,
                useClass: TokenInterceptor,
                multi: true
              },
              AuthGuards
              ],
  bootstrap: [AppComponent]
})
export class AppModule { }
