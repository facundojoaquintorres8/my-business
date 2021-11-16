import { Routes } from '@angular/router';
import {ClientesComponent} from './clientes.component';
import { PagingParamsResolve } from '../util/paging-params-resolve';
import {UpdateClientesComponent} from './update-clientes.component';
import {DetailClientesComponent} from './detail-clientes.component';


export const clientesRoutes: Routes = [
  {
   path: '',
   component: ClientesComponent,
   resolve: {
       paginParams: PagingParamsResolve // ¿ Que es esto ?
   },
   data: {
       title: 'Clientes'
   }
  },
  {
    path: 'new',
    component: UpdateClientesComponent,
    resolve: {
      paginParams: PagingParamsResolve
    },
    data: {
      title: 'Clientes-New'
    }
  },
  {
    path: ':dni/edit',
    component: UpdateClientesComponent,
    resolve: {
      paginParams: PagingParamsResolve
    },
    data: {
      title: 'Clientes-Edit'
    }
  },
  {
    path: ':dni/view',
    component: DetailClientesComponent,
    data: {
      title: 'Detalle del Cliente.'
    }
  }
];
