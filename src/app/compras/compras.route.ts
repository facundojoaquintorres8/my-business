import { Routes } from '@angular/router';
import { PagingParamsResolve } from '../util/paging-params-resolve';
import { CompraComponent } from './compras.component';
import { CreateCompraComponent } from './create-compras.component';

export const comprasRoute: Routes = [
  {
    path: '',
    component: CompraComponent,
    resolve: {
      paginParams: PagingParamsResolve
    },
    data: {
      title: 'Compras'
    }
  },
  {
    path: 'new',
    component: CreateCompraComponent,
    data: {
      title: 'Comprar',
    },
  },
  // {
  //   path: ':id/view',
  //   component: DetailProductoComponent,
  //   data: {
  //     title: 'Detalle de Producto',
  //   },
  // }
];
