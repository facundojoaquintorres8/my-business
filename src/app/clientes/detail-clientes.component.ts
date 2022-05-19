import { Component, OnInit } from '@angular/core';
import { ICliente } from './clientes.models';
import { ClientesService } from './clientes.service';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { DeleteClientesModalComponent } from './delete-clientes-modal.component';

@Component({
    selector: 'app-detail-clientes',
    templateUrl: './detail-clientes.component.html'
})
export class DetailClientesComponent implements OnInit {
    cliente!: ICliente;
    ngbModalRef: any;
    modelService: any;

    constructor(
        private clienteService: ClientesService,
        private activatedRoute: ActivatedRoute,
        private modalService: NgbModal,
    ) {
    }

    ngOnInit(): void {
        const dni = this.activatedRoute.snapshot.paramMap.get('dni');
        if (dni) {
            this.clienteService.find(dni).subscribe(
                (res: HttpResponse<ICliente>) => this.cliente = res.body!
            );
        }
    }

    previousState(): void {
        window.history.back();
    }

    delete(dni: string): void {
        this.ngbModalRef = this.modalService.open(DeleteClientesModalComponent, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.dni = dni;
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
