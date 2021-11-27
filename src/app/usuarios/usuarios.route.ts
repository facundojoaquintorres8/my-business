import { Routes } from '@angular/router';
import { PagingParamsResolve } from '../util/paging-params-resolve';
import {UsuariosComponent} from './usuarios.component';
import {UpdateUsuarioComponent} from "./update-usuario.component";
import {DeleteUsuariosModalComponent} from "./delete-usuarios-modal.component";
import {CambiarClaveComponent} from "../cuenta/cambiar-clave.component";
import {LoginComponent} from "../auth/login.component";
import {DetailUsuarioComponent} from "./detail-usuario.component";

export const usuariosRoute: Routes = [
  {
    path: '',
    component: UsuariosComponent,
    resolve: {
      paginParams: PagingParamsResolve
    },
    data: {
      title: 'Usuarios'
    }
  },
  {
    path: 'new',
    component: UpdateUsuarioComponent,
    resolve: {
      paginParams: PagingParamsResolve
    },
    data: {
      title: 'Nuevo Usuarios'
    }
  },
  {
    path: 'login',
    component: LoginComponent,
    resolve: {
      paginParams: PagingParamsResolve
    },
    data: {
      title: 'Login'
    }
  },
  {
    path: ':id/edit',
    component: UpdateUsuarioComponent,
    resolve: {
      paginParams: PagingParamsResolve
    },
    data: {
      title: 'Editar Usuarios'
    }
  },
  {
    path: ':id/delete',
    component: DeleteUsuariosModalComponent,
    resolve: {
      paginParams: PagingParamsResolve
    },
    data: {
      title: 'Eliminar Usuarios'
    }
  },
  {
    path: ':id/view',
    component: DetailUsuarioComponent,
    resolve: {
      paginParams: PagingParamsResolve
    },
    data: {
      title: 'Detalle Usuario'
    }
  }
];
