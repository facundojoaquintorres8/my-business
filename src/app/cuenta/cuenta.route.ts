import { Routes } from '@angular/router';
import { PagingParamsResolve } from '../util/paging-params-resolve';
import {CambiarClaveComponent} from './cambiar-clave.component';
import {AuthGuards} from "../security/auth-guards";

export const cuentaRoute = [
  {
    path: 'cambiarclave',
    component: CambiarClaveComponent,
    resolve: {
      paginParams: PagingParamsResolve
    },
    data: {
      title: 'Cambiar Clave'
    },
    canActivate: [AuthGuards]
  }
]
