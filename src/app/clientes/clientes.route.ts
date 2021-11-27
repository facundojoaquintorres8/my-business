import { Routes } from '@angular/router';
import {ClientesComponent} from './clientes.component';
import { PagingParamsResolve } from '../util/paging-params-resolve';
import {UpdateClientesComponent} from './update-clientes.component';
import {DetailClientesComponent} from './detail-clientes.component';
import {AuthGuards} from "../security/auth-guards";


export const clientesRoutes: Routes = [
  {
   path: '',
   component: ClientesComponent,
   resolve: {
       paginParams: PagingParamsResolve
   },
   data: {
       title: 'Clientes'
   },
    canActivate: [AuthGuards]
  },
  {
    path: 'new',
    component: UpdateClientesComponent,
    resolve: {
      paginParams: PagingParamsResolve
    },
    data: {
      title: 'Clientes-New'
    },
    canActivate: [AuthGuards]
  },
  {
    path: ':dni/edit',
    component: UpdateClientesComponent,
    resolve: {
      paginParams: PagingParamsResolve
    },
    data: {
      title: 'Clientes-Edit'
    },
    canActivate: [AuthGuards]
  },
  {
    path: ':dni/view',
    component: DetailClientesComponent,
    data: {
      title: 'Detalle del Cliente.'
    },
    canActivate: [AuthGuards]
  }
];
