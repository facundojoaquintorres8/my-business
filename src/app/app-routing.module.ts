import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PublicLayoutComponent } from './layout/public/public-layout.component';
import {UsuariosModule} from "./usuarios/usuarios.module";
import {CuentaModule} from "./cuenta/cuenta.module";
import {AuthModule} from "./auth/auth.module";
import {PrivateLayoutComponent} from "./layout/private/private-layout.component";

export const routes: Routes = [
  {
    path: '',
    component: PublicLayoutComponent,
    data: {
      title: 'Mi Negocio'
    },
    children: [
      {
        path: '',
        loadChildren: () => import('./auth/auth.module').then(m => AuthModule)
      },
      {
        path: 'login',
        loadChildren: () => import('./auth/auth.module').then(m => AuthModule)
      }
    ],
  },
  {
    path:'',
    component: PrivateLayoutComponent,
    data: {
      title: 'Turnera'
    },
    children: [
      {
        path: 'home',
        loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
      },
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
        path:'#',
        redirectTo:'/home'
      }
    ]
  },
  { path: '**', redirectTo: '/login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}


