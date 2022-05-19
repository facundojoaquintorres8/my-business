import { Routes } from '@angular/router';
import { PagingParamsResolve } from '../util/paging-params-resolve';
import { AuthGuards } from '../security/auth-guards';
import { HomeComponent } from './home.component';


export const homeRoute: Routes = [
    {
        path: '',
        component: HomeComponent,
        resolve: {
            pagingParams: PagingParamsResolve
        },
        data: {
            title: 'Home',
            permissions: ['Administrador', 'Compras', 'Ventas', 'Supervisor']
        },
        canActivate: [AuthGuards]
    }
];
