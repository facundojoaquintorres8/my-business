import { PagingParamsResolve } from '../util/paging-params-resolve';
import { CambiarClaveComponent } from './cambiar-clave.component';
import { AuthGuards } from "../security/auth-guards";

export const cuentaRoute = [
  {
    path: 'cambiar-clave',
    component: CambiarClaveComponent,
    resolve: {
      paginParams: PagingParamsResolve
    },
    data: {
      title: 'Cambiar Clave',
      permissions: ['Administrador', 'Ventas', 'Compras', 'Supervisor']
    },
    canActivate: [AuthGuards]
  }
]
