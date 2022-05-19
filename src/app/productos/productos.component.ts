import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DeleteProductoModalComponent } from './delete-productos-modal.component';
import { ProductoService } from './productos.service';
import { IProducto } from './productos.models';
import { FormBuilder } from '@angular/forms';
import { IPage, newPage, totalPages } from '../shared/page.models';
import { ActivatedRoute, Router } from '@angular/router';
import { ICategoriaProducto } from '../categorias-productos/categorias-productos.models';
import { CategoriaProductoService } from '../categorias-productos/categorias-productos.service';

@Component({
    selector: 'app-productos',
    templateUrl: './productos.component.html'
})
export class ProductoComponent implements OnInit {
    collapsedFilter = false;
    page!: IPage;
    myForm = this.fb.group({
        descripcion: [null],
        categoriaId: [null],
        requiereStock: [null],
        verInactivos: [null],
    });
    categorias: ICategoriaProducto[] = [];
    rows: IProducto[] = [];
    loading = false;
    private ngbModalRef: NgbModalRef | undefined;

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private productoService: ProductoService,
        private categoriaProductoService: CategoriaProductoService,
        private modalService: NgbModal,
        private fb: FormBuilder,
    ) {
        this.activatedRoute.data.subscribe(data => {
            this.page = data.pagingParams ? data.pagingParams : newPage({ activo: true }, ['descripcion', 'ASC']);
        });
    }

    ngOnInit(): void {
        this.categoriaProductoService.findAll({
            limit: 0,
            activa: true
        }).subscribe(
            (res) => this.categorias = res.body.rows
        );

        this.findAll();

        if (this.page.filter.descripcion) {
            this.myForm.get(['descripcion'])!.setValue(this.page.filter.descripcion);
        }
        if (this.page.filter.categoriaId) {
            this.myForm.get(['categoriaId'])!.setValue(this.page.filter.categoriaId);
        }
        if (this.page.filter.requiereStock) {
            this.myForm.get(['requiereStock'])!.setValue(this.page.filter.requiereStock);
        }
        if (this.page.filter.activo) {
            this.myForm.get(['verInactivos'])!.setValue(false);
        } else {
            this.myForm.get(['verInactivos'])!.setValue(true);
        }
    }

    findAll(): void {
        this.transition();
        this.loading = true;
        this.productoService.findAll({
            ...this.page.filter,
            ...{
                offset: this.page.offset,
                order: this.page.order
            }
        }).subscribe(res => {
            this.rows = res.body.rows;
            this.loading = false;
            this.page.totalElements = res.body.count;
            this.page.totalPages = totalPages(this.page.size, this.page.totalElements);
        }, () => this.loading = false);
    }

    onSort(event: any): void {
        this.page.order = [event.sorts[0].prop, event.sorts[0].dir];
        this.findAll();
    }

    onFilter(): void {
        this.page.filter = {};
        if (this.myForm.get(['descripcion'])!.value) {
            Object.assign(this.page.filter, {
                descripcion: this.myForm.get(['descripcion'])!.value.toLowerCase()
            });
        }
        if (this.myForm.get(['categoriaId'])!.value) {
            Object.assign(this.page.filter, {
                categoriaId: this.myForm.get(['categoriaId'])!.value
            });
        }
        if (this.myForm.get(['requiereStock'])!.value) {
            Object.assign(this.page.filter, {
                requiereStock: this.myForm.get(['requiereStock'])!.value
            });
        }
        if (!this.myForm.get(['verInactivos'])!.value) {
            Object.assign(this.page.filter, {
                activo: true
            });
        }

        this.findAll();
    }

    clearFilter(): void {
        this.page.filter = { activo: true };
        this.page = newPage(this.page.filter, this.page.order);
        this.myForm.get(['verInactivos'])!.setValue(false);
        this.myForm.get(['descripcion'])!.setValue('');
        this.myForm.get(['categoriaId'])!.setValue(null);
        this.myForm.get(['requiereStock'])!.setValue(false);
        this.findAll();
    }

    setPage(pageInfo: any): void {
        this.page.offset = pageInfo.offset;
        this.findAll();
    }

    delete(id: number): void {
        this.ngbModalRef = this.modalService.open(DeleteProductoModalComponent, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.id = id;
        this.ngbModalRef.result.then(
            () => {
                this.ngbModalRef = undefined;
                this.findAll();
            },
            () => {
                this.ngbModalRef = undefined;
            }
        );
    }

    transition(): void {
        this.router.navigate(['/productos'], {
            queryParams: {
                page: JSON.stringify(this.page)
            },
            replaceUrl: true
        });
    }
}
