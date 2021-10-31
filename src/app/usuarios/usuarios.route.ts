import { Routes } from '@angular/router';
import { PagingParamsResolve } from '../util/paging-params-resolve';
import {UsuariosComponent} from './usuarios.component';

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
  }
];
