import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IProducto } from './productos.models';
import { ProductoService } from './productos.service';

@Component({
    templateUrl: './delete-productos-modal.component.html'
})
export class DeleteProductoModalComponent implements OnInit {
    id!: number;
    producto!: IProducto;

    constructor(private productoService: ProductoService, private activeModal: NgbActiveModal) {
    }

    ngOnInit(): void {
        this.productoService.find(this.id).subscribe(res => {
            this.producto = res.body!;
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

