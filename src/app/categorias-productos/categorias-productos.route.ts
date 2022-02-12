import { Routes } from '@angular/router';
import { DetailCategoriaProductoComponent } from './detail-categorias-productos.component';
import { UpdateCategoriaProductoComponent } from './update-categorias-productos.component';
import { CategoriaProductoComponent } from './categorias-productos.component';
import { PagingParamsResolve } from '../util/paging-params-resolve';
import {AuthGuards} from "../security/auth-guards";

export const categoriaProductoRoutes: Routes = [
  {
    path: '',
    component: CategoriaProductoComponent,
    resolve: {
      pagingParams: PagingParamsResolve
  },
    data: {
      title: 'Categorías de Productos',
      permissions: ['Administrador','Compras','Ventas','Supervisor']
    },
    canActivate: [AuthGuards]
  },
  {
    path: 'new',
    component: UpdateCategoriaProductoComponent,
    data: {
      title: 'Crear Categoría de Producto',
      permissions: ['Administrador','Compras','Ventas','Supervisor']
    },
  },
  {
    path: ':id/edit',
    component: UpdateCategoriaProductoComponent,
    data: {
      title: 'Actualizar Categoría de Producto',
      permissions: ['Administrador','Compras','Ventas','Supervisor']
    },
  },
  {
    path: ':id/view',
    component: DetailCategoriaProductoComponent,
    data: {
      title: 'Detalle de Categoría de Producto',
      permissions: ['Administrador','Compras','Ventas','Supervisor']
    },
  }
];
