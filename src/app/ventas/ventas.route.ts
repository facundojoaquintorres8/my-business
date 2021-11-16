import { Routes } from '@angular/router';
import { PagingParamsResolve } from '../util/paging-params-resolve';
import {VentaComponent} from './venta.component';
import {DetailVentasComponent} from './detail-ventas.component';


export const ventasRoute: Routes = [
  {
    path: '',
    component: VentaComponent,
    resolve: {
      paginParams: PagingParamsResolve // ¿ Que es esto ?
    },
    data: {
      title: 'Ventas'
    }
  },
  {
    path: ':id/view',
    component: DetailVentasComponent,
    resolve: {
      paginParams: PagingParamsResolve // ¿ Que es esto ?
    },
    data: {
      title: 'Detalle Venta'
    }
  }
  ];
