import { Routes } from '@angular/router';
import { PagingParamsResolve } from '../util/paging-params-resolve';
import {UsuariosComponent} from './usuarios.component';
import {UpdateUsuarioComponent} from "./update-usuario.component";
import {DeleteUsuariosModalComponent} from "./delete-usuarios-modal.component";
import {DetailUsuarioComponent} from "./detail-usuario.component";
import {AuthGuards} from "../security/auth-guards";

export const usuariosRoute: Routes = [
  {
    path: '',
    component: UsuariosComponent,
    resolve: {
      paginParams: PagingParamsResolve
    },
    data: {
      title: 'Usuarios'
    },
    canActivate: [AuthGuards]
  },
  {
    path: 'new',
    component: UpdateUsuarioComponent,
    resolve: {
      paginParams: PagingParamsResolve
    },
    data: {
      title: 'Nuevo Usuarios'
    },
    canActivate: [AuthGuards]
  },
  {
    path: ':id/edit',
    component: UpdateUsuarioComponent,
    resolve: {
      paginParams: PagingParamsResolve
    },
    data: {
      title: 'Editar Usuarios'
    },
    canActivate: [AuthGuards]
  },
  {
    path: ':id/delete',
    component: DeleteUsuariosModalComponent,
    resolve: {
      paginParams: PagingParamsResolve
    },
    data: {
      title: 'Eliminar Usuarios'
    },
    canActivate: [AuthGuards]
  },
  {
    path: ':id/view',
    component: DetailUsuarioComponent,
    resolve: {
      paginParams: PagingParamsResolve
    },
    data: {
      title: 'Detalle Usuario'
    },
    canActivate: [AuthGuards]
  }
];
