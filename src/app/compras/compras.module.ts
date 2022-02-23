import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { CompraComponent } from './compras.component';
import { comprasRoute } from './compras.route';
import { CreateCompraComponent } from './create-compras.component';
import { DetailCompraComponent } from './detail-compras.component';

@NgModule({
  declarations: [
    CompraComponent,
    CreateCompraComponent,
    DetailCompraComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(comprasRoute)
  ]
})
export class CompraModule { }
