import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {ICategoriaProducto} from '../categorias-productos/categorias-productos.models';
import {CategoriaProductoService} from '../categorias-productos/categorias-productos.service';
import {IQuickProducto} from './productos.models';

@Component({
    templateUrl: './add-quick-productos-modal.component.html'
})
export class AddQuickProductoModalComponent implements OnInit {
    categorias: ICategoriaProducto[] = [];

    myForm = this.fb.group({
        id: [],
        descripcion: [null, [Validators.required]],
        categoriaId: [null, [Validators.required]],
        cantidadMinima: [null, [Validators.required, Validators.min(0)]],
        precioVenta: [null, [Validators.required, Validators.min(0)]],
    });

    constructor(
        private categoriaProductoService: CategoriaProductoService,
        private fb: FormBuilder,
        private activeModal: NgbActiveModal
    ) {
    }

    ngOnInit(): void {
        this.categoriaProductoService.findAll({limit: 0, activa: true}).subscribe(
            (res) => this.categorias = res.body.rows
        );
    }

    cancel(): void {
        this.activeModal.dismiss();
    }

    save(): void {
        this.activeModal.close(this.createFromForm());
    }

    private createFromForm(): IQuickProducto {
        return {
            descripcion: this.myForm.get(['descripcion'])!.value,
            categoriaId: this.myForm.get(['categoriaId'])!.value,
            cantidadMinima: this.myForm.get(['cantidadMinima'])!.value,
            precioVenta: this.myForm.get(['precioVenta'])!.value,
        };
    }

}

