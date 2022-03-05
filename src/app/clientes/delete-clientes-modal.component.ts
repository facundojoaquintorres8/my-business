import {Component, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {ICliente} from './clientes.models';
import {ClientesService} from './clientes.service';


@Component({
    templateUrl: './delete-clientes-modal.component.html'
})
export class DeleteClientesModalComponent implements OnInit {
    dni!: string;
    cliente!: ICliente;

    constructor(private clienteService: ClientesService, private activeModal: NgbActiveModal) {
    }

    ngOnInit(): void {
        this.clienteService.find(this.dni).subscribe(res => {
            this.cliente = res.body!;
        });
    }

    cancel(): void {
        this.activeModal.dismiss();
    }

    confirmDelete(dni: string): void {
        this.clienteService.delete(dni).subscribe(() => {
            this.activeModal.close();
        });
    }
}
