import { Component, OnInit } from '@angular/core';
import { IUser } from './usuarios.models';
import { UsuariosService } from './usuarios.service';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { DeleteUsuariosModalComponent } from './delete-usuarios-modal.component';

@Component({
  selector: 'app-detail-usuarios',
  templateUrl: 'detail-usuario.component.html'
})
export class DetailUsuarioComponent implements OnInit {
  user!: IUser;
  ngbModalRef: any;

  constructor(
    private usuarioService: UsuariosService,
    private activatedRoute: ActivatedRoute,
    private modalService: NgbModal,
  ) { }

  ngOnInit(): void {
    const id = parseInt(this.activatedRoute.snapshot.paramMap.get('id')!);
    if (id) {
      this.usuarioService.find(id).subscribe(
        (res: HttpResponse<IUser>) => {
          this.user = res.body!
        }
      );
    }
  }

  previousState(): void {
    window.history.back();
  }

  delete(id: number): void {
    this.ngbModalRef = this.modalService.open(DeleteUsuariosModalComponent, { size: 'lg', backdrop: 'static' });
    this.ngbModalRef.componentInstance.id = id;
    this.ngbModalRef.result.then(
      () => {
        this.previousState();
      },
      () => {
        this.ngbModalRef = undefined;
      }
    );
  }
}
