import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import {UsuariosModule} from "./usuarios/usuarios.module";
import {CuentaModule} from "./cuenta/cuenta.module";
import {AuthModule} from "./auth/auth.module";

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    data: {
      title: 'Mi Negocio'
    },
    children: [
      // {
      //   path: '',
      //   component: HomeComponent,
      //   pathMatch: 'full'
      // },
      {
        path: 'categorias-productos',
        loadChildren: () => import('./categorias-productos/categorias-productos.module').then(m => m.CategoriaProductoModule)
      },
      {
        path: 'productos',
        loadChildren: () => import('./productos/productos.module').then(m => m.ProductoModule)
      },
      {
        path: 'proveedores',
        loadChildren: () => import('./proveedores/proveedores.module').then(m => m.ProveedorModule)
      },
      {
        path: 'clientes',
        loadChildren: () => import('./clientes/clientes.module').then(m => m.ClientesModule)
      },
      {
        path: 'ventas',
        loadChildren: () => import('./ventas/ventas.module').then(m => m.VentasModule)
      },
      {
        path: 'usuarios',
        loadChildren: () => import('./usuarios/usuarios.module').then(m => UsuariosModule)
      },
      {
        path: 'cuenta',
        loadChildren: () => import('./cuenta/cuenta.module').then(m => CuentaModule)
      },
      {
        path: 'login',
        loadChildren: () => import('./auth/auth.module').then(m => AuthModule)
      }
    ],
  },
  { path: '**', redirectTo: '/' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}


