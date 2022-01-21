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
       title: 'Clientes',
     permissions: ['administrador','ventas','supervisor']
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
      title: 'Clientes-New',
      permissions: ['administrador','ventas','supervisor']
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
      title: 'Clientes-Edit',
      permissions: ['administrador','ventas','supervisor']
    },
    canActivate: [AuthGuards]
  },
  {
    path: ':dni/view',
    component: DetailClientesComponent,
    data: {
      title: 'Detalle del Cliente.',
      permissions: ['administrador','ventas','supervisor']
    },
    canActivate: [AuthGuards]
  }
];
