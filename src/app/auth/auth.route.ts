import { Routes } from '@angular/router';
import { PagingParamsResolve } from '../util/paging-params-resolve';
import {LoginComponent} from "./login.component";

export const authRoute = [
  {
    path: '',
    component: LoginComponent,
    resolve: {
      paginParams: PagingParamsResolve
    },
    data: {
      title: 'Iniciar Sesion'
    }
  }
]
