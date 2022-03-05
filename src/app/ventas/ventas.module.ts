import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {SharedModule} from '../shared/shared.module';
import {VentasComponent} from './ventas.component';
import {ventasRoute} from './ventas.route';
import {CreateVentaComponent} from './create-ventas.component';
import {DetailVentaComponent} from './detail-ventas.component';

@NgModule({
    declarations: [
        VentasComponent,
        CreateVentaComponent,
        DetailVentaComponent
    ],
    imports: [
        SharedModule,
        RouterModule.forChild(ventasRoute)
    ]
})
export class VentasModule {
}
