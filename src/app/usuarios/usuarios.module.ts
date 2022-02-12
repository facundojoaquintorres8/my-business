import { NgModule } from '@angular/core';
import {RouterModule} from '@angular/router';
import {SharedModule} from '../shared/shared.module';
import {usuariosRoute} from './usuarios.route';
import {UsuariosComponent} from './usuarios.component';
import {UpdateUsuarioComponent} from "./update-usuario.component";
import {DeleteUsuariosModalComponent} from './delete-usuarios-modal.component';
import {DetailUsuarioComponent} from "./detail-usuario.component";


@NgModule({
  declarations: [ UsuariosComponent,
                  UpdateUsuarioComponent,
                  DeleteUsuariosModalComponent,
                  DetailUsuarioComponent
  ],

  imports: [
    SharedModule,
    RouterModule.forChild(usuariosRoute)
    ],
  entryComponents: [DeleteUsuariosModalComponent]
})
export class UsuariosModule { }
