import { Routes } from '@angular/router';
import { PagingParamsResolve } from '../util/paging-params-resolve';
import { VentaComponent } from './venta.component';
import { DetailVentasComponent } from './detail-ventas.component';
import { AuthGuards } from "../security/auth-guards";

export const ventasRoute: Routes = [
  {
    path: '',
    component: VentaComponent,
    resolve: {
      paginParams: PagingParamsResolve
    },
    data: {
      title: 'Ventas',
      permissions: ['Administrador', 'Ventas', 'Supervisor']
    },
    canActivate: [AuthGuards]
  },
  {
    path: ':id/view',
    component: DetailVentasComponent,
    resolve: {
      paginParams: PagingParamsResolve
    },
    data: {
      title: 'Detalle Venta',
      permissions: ['Administrador', 'Ventas', 'Supervisor']
    },
    canActivate: [AuthGuards]
  }
];
