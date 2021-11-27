import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {UsuariosService} from './usuarios.service';
import {IUser, IUsuario} from './usuarios.models';

@Component({
  templateUrl: './delete-usuarios-modal.component.html'
})
export class DeleteUsuariosModalComponent implements OnInit{
  id!: number;
  usuario!: IUser;

  constructor(private usuarioService: UsuariosService, private activeModal: NgbActiveModal) { }


  ngOnInit() {
    this.usuarioService.find(this.id).subscribe(res=>{
      this.usuario = res.body!;
    });
  }
  cancel(): void{
    this.activeModal.dismiss();
  }
  confirmDelete(id: number): void{
    this.usuarioService.delete(id).subscribe(()=>{
      this.activeModal.close();
    });
}
}
