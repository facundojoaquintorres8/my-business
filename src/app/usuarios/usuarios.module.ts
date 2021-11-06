import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';
import {SharedModule} from '../shared/shared.module';
import {usuariosRoute} from './usuarios.route';
import {UsuariosComponent} from './usuarios.component';
import {UpdateUsuarioComponent} from "./update-usuario.component";
import {DeleteUsuariosModalComponent} from './delete-usuarios-modal.component';
import {CambiarPasswordComponent} from './cambiar-password.component';


@NgModule({
  declarations: [ UsuariosComponent,
                  UpdateUsuarioComponent,
                  DeleteUsuariosModalComponent,
                  CambiarPasswordComponent
  ],

  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(usuariosRoute)
    ],
  entryComponents: [DeleteUsuariosModalComponent]
})
export class UsuariosModule { }
