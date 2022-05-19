import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { CategoriaProductoService } from './categorias-productos.service';
import { ICategoriaProducto } from './categorias-productos.models';

@Component({
    selector: 'app-update-categorias-productos',
    templateUrl: './update-categorias-productos.component.html'
})
export class UpdateCategoriaProductoComponent implements OnInit {
    isSaving = false;

    myForm = this.fb.group({
        id: [],
        descripcion: [null, [Validators.required]],
        activa: [null],
    });

    constructor(
        private categoriaProductoService: CategoriaProductoService,
        private activatedRoute: ActivatedRoute,
        private fb: FormBuilder,
    ) { }

    ngOnInit(): void {
        const id = this.activatedRoute.snapshot.paramMap.get('id');
        if (id) {
            this.categoriaProductoService.find(parseInt(id, 10)).subscribe(
                (res: HttpResponse<ICategoriaProducto>) => this.updateForm(res.body!)
            );
        }
    }

    updateForm(categoriaProducto: ICategoriaProducto): void {
        this.myForm.patchValue({
            id: categoriaProducto.id,
            descripcion: categoriaProducto.descripcion,
            activa: categoriaProducto.activa,
        });
    }

    previousState(): void {
        window.history.back();
    }

    save(): void {
        this.isSaving = true;
        const categoriaProducto = this.createFromForm();
        if (categoriaProducto.id) {
            this.subscribeToSaveResponse(this.categoriaProductoService.update(categoriaProducto));
        } else {
            this.subscribeToSaveResponse(this.categoriaProductoService.create(categoriaProducto));
        }
    }

    private createFromForm(): ICategoriaProducto {
        return {
            id: this.myForm.get(['id'])!.value,
            activa: this.myForm.get(['activa'])!.value,
            descripcion: this.myForm.get(['descripcion'])!.value,
        };
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ICategoriaProducto>>): void {
        result.subscribe(
            () => this.previousState(),
            () => this.isSaving = false
        );
    }
}
