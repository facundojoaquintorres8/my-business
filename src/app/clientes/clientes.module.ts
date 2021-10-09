import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';
import {SharedModule} from '../shared/shared.module';
import {clientesRoutes} from './clientes.route';

import {ClientesComponent} from './clientes.component';
import {DeleteClientesModalComponent} from './delete-clientes-modal.component';
import {UpdateClientesComponent} from './update-clientes.component';
import {DetailClientesComponent} from './detail-clientes.component';


@NgModule({
  declarations: [ ClientesComponent,
                  DeleteClientesModalComponent,
                  UpdateClientesComponent,
                  DetailClientesComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(clientesRoutes) // ¿Para que sirve esto?
  ],
  entryComponents: [DeleteClientesModalComponent] // ¿ para que sirve esto
})
export class ClientesModule { }
