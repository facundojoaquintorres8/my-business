import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { CambiarClaveComponent } from './cambiar-clave.component';
import { cuentaRoute } from './cuenta.route';


@NgModule({
    declarations: [
        CambiarClaveComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        RouterModule.forChild(cuentaRoute)
    ]
})
export class CuentaModule { }
