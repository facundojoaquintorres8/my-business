import {Component, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {IProveedor} from './proveedores.models';
import {ProveedorService} from './proveedores.service';

@Component({
    templateUrl: './delete-proveedores-modal.component.html'
})
export class DeleteProveedorModalComponent implements OnInit {
    id!: number;
    proveedor!: IProveedor;

    constructor(private productoService: ProveedorService, private activeModal: NgbActiveModal) {
    }

    ngOnInit(): void {
        this.productoService.find(this.id).subscribe(res => {
            this.proveedor = res.body!;
        });
    }

    cancel(): void {
        this.activeModal.dismiss();
    }

    confirmDelete(id: number): void {
        this.productoService.delete(id).subscribe(
            () => this.activeModal.close()
        );
    }
}

