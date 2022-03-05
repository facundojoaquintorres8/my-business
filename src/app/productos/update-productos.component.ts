import {Component, OnInit} from '@angular/core';
import {HttpResponse} from '@angular/common/http';
import {FormBuilder, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';
import {ProductoService} from './productos.service';
import {IProducto, IProductoUpdate} from './productos.models';
import {ICategoriaProducto} from '../categorias-productos/categorias-productos.models';
import {CategoriaProductoService} from '../categorias-productos/categorias-productos.service';

@Component({
    selector: 'app-update-productos',
    templateUrl: './update-productos.component.html'
})
export class UpdateProductoComponent implements OnInit {
    isSaving = false;

    categorias: ICategoriaProducto[] = [];

    myForm = this.fb.group({
        id: [],
        descripcion: [null, [Validators.required]],
        categoriaId: [null, [Validators.required]],
        stock: [null, [Validators.required, Validators.min(0)]],
        cantidadMinima: [null, [Validators.required, Validators.min(0)]],
        precioVenta: [null, [Validators.required, Validators.min(0)]],
        activo: [null],
    });

    constructor(
        private productoService: ProductoService,
        private categoriaProductoService: CategoriaProductoService,
        private activatedRoute: ActivatedRoute,
        private fb: FormBuilder,
    ) {
    }

    ngOnInit(): void {
        this.categoriaProductoService.findAll({
            limit: 0,
            activa: true
        }).subscribe(
            (res) => this.categorias = res.body.rows
        );

        const id = this.activatedRoute.snapshot.paramMap.get('id');
        if (id) {
            this.productoService.find(parseInt(id, 10)).subscribe(
                (res: HttpResponse<IProducto>) => this.updateForm(res.body!)
            );
        }
    }

    updateForm(producto: IProducto): void {
        this.myForm.patchValue({
            id: producto.id,
            descripcion: producto.descripcion,
            categoriaId: producto.categoria ? producto.categoria.id : null,
            stock: producto.stock,
            cantidadMinima: producto.cantidadMinima,
            precioVenta: producto.precioVenta,
            activo: producto.activo,
        });
    }

    previousState(): void {
        window.history.back();
    }

    save(): void {
        this.isSaving = true;
        const producto = this.createFromForm();
        if (producto.id) {
            this.subscribeToSaveResponse(this.productoService.update(producto));
        } else {
            this.subscribeToSaveResponse(this.productoService.create(producto));
        }
    }

    private createFromForm(): IProductoUpdate {
        return {
            id: this.myForm.get(['id'])!.value,
            descripcion: this.myForm.get(['descripcion'])!.value,
            categoriaId: this.myForm.get(['categoriaId'])!.value,
            stock: this.myForm.get(['stock'])!.value,
            cantidadMinima: this.myForm.get(['cantidadMinima'])!.value,
            precioVenta: this.myForm.get(['precioVenta'])!.value,
            activo: this.myForm.get(['activo'])!.value,
        };
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IProducto>>): void {
        result.subscribe(
            () => this.previousState(),
            () => this.isSaving = false
        );
    }
}
