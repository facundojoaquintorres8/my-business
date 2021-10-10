import { Routes } from '@angular/router';
import { PagingParamsResolve } from '../util/paging-params-resolve';
import {VentaComponent} from './venta.component';


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
  }
];
