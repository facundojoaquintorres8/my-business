import { Routes } from '@angular/router';
import { DetailProductoComponent } from './detail-productos.component';
import { UpdateProductoComponent } from './update-productos.component';
import { ProductoComponent } from './productos.component';
import { PagingParamsResolve } from '../util/paging-params-resolve';
import {AuthGuards} from "../security/auth-guards";

export const productoRoutes: Routes = [
  {
    path: '',
    component: ProductoComponent,
    resolve: {
      pagingParams: PagingParamsResolve
  },
    data: {
      title: 'Productos',
      permissions: ['Administrador','Ventas','Compras','Supervisor']
    },
    canActivate: [AuthGuards]
  },
  {
    path: 'new',
    component: UpdateProductoComponent,
    data: {
      title: 'Crear Producto',
      permissions: ['Administrador','Ventas','Compras','Supervisor']
    },
    canActivate: [AuthGuards]
  },
  {
    path: ':id/edit',
    component: UpdateProductoComponent,
    data: {
      title: 'Actualizar Producto',
      permissions: ['Administrador','Ventas','Compras','Supervisor']
    },
    canActivate: [AuthGuards]
  },
  {
    path: ':id/view',
    component: DetailProductoComponent,
    data: {
      title: 'Detalle de Producto',
      permissions: ['Administrador','Ventas','Compras','Supervisor']
    },
    canActivate: [AuthGuards]
  }
];
