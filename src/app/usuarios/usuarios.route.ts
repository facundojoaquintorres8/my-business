import { Routes } from '@angular/router';
import { PagingParamsResolve } from '../util/paging-params-resolve';
import {UsuariosComponent} from './usuarios.component';
import {UpdateUsuarioComponent} from "./update-usuario.component";
import {DeleteUsuariosModalComponent} from "./delete-usuarios-modal.component";

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
  }
];
