import {Component, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {ICategoriaProducto} from './categorias-productos.models';
import {CategoriaProductoService} from './categorias-productos.service';
import {ToastService} from '../toast/toast.service';

@Component({
    templateUrl: './delete-categorias-productos-modal.component.html'
})
export class DeleteCategoriaProductoModalComponent implements OnInit {
    id!: number;
    categoriaProducto!: ICategoriaProducto;

    constructor(
        private categoriaProductoService: CategoriaProductoService,
        private activeModal: NgbActiveModal,
        private toastService: ToastService
        ) {
    }

    ngOnInit(): void {
        this.categoriaProductoService.find(this.id).subscribe(res => {
            this.categoriaProducto = res.body!;
        });
    }

    cancel(): void {
        this.activeModal.dismiss();
    }

    confirmDelete(id: number): void {
        this.categoriaProductoService.delete(id).subscribe(
            () => this.activeModal.close(),
            (error) => {
                this.toastService.changeMessage({
                        isError: true,
                        message: 'No se puede eliminar la categoria, porque ya tiene productos asociados a ella',
                    }
                );
            }
        )
    }
}

