import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';

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
