import { Component, OnInit } from '@angular/core';
import { IUser } from './usuarios.models';
import { UsuariosService } from './usuarios.service';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { DeleteUsuariosModalComponent } from './delete-usuarios-modal.component';
import { AuthService } from '../auth/auth.service';
import { ISessionUser } from '../auth/auth.models';

@Component({
    selector: 'app-detail-usuarios',
    templateUrl: 'detail-usuario.component.html'
})
export class DetailUsuarioComponent implements OnInit {
    user!: IUser;
    sessionUser!: ISessionUser;
    ngbModalRef: any;

    constructor(
        private usuarioService: UsuariosService,
        private activatedRoute: ActivatedRoute,
        private modalService: NgbModal,
        private authService: AuthService
    ) {
    }

    ngOnInit(): void {
        this.sessionUser = this.authService.getSessionUser();
        const id = parseInt(this.activatedRoute.snapshot.paramMap.get('id')!, 10);
        if (id) {
            this.usuarioService.find(id).subscribe(
                (res: HttpResponse<IUser>) => {
                    this.user = res.body!;
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
