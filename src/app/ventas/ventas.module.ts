import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';
import {SharedModule} from '../shared/shared.module';
import {VentaComponent} from './venta.component';
import {DetailVentasComponent} from './detail-ventas.component';
import {ventasRoute} from './ventas.route';

@NgModule({
  declarations: [
    VentaComponent,
    DetailVentasComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(ventasRoute) // ¿Para que sirve esto?
  ]
})
export class VentasModule{ }
