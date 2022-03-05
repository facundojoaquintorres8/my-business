import {NgModule} from '@angular/core';
import {LoginComponent} from './login.component';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../shared/shared.module';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AuthService} from './auth.service';
import {RouterModule} from '@angular/router';
import {authRoute} from './auth.route';

@NgModule({
    declarations: [
        LoginComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        HttpClientModule,
        RouterModule.forChild(authRoute)
    ],
    providers: [
        {provide: HTTP_INTERCEPTORS, useClass: AuthService, multi: true}
    ],
})
export class AuthModule {
}
