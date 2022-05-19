import { Component, OnInit } from '@angular/core';
import { ICompra, ICompraItem } from './compras.model';
import { IPage, newPage, totalPages } from '../shared/page.models';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { ComprasService } from './compras.service';
import { IProveedor } from '../proveedores/proveedores.models';
import { ProveedorService } from '../proveedores/proveedores.service';

@Component({
    selector: 'app-compras',
    templateUrl: './compras.component.html'
})
export class CompraComponent implements OnInit {

    collapsedFilter = false;
    page!: IPage;
    myForm = this.fb.group({
        proveedorId: [null],
        desde: [null],
        hasta: [null]
    });
    rows: ICompra[] = [];
    loading = false;

    proveedores: IProveedor[] = [];

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private fb: FormBuilder,
        private comprasService: ComprasService,
        private proveedorService: ProveedorService,
    ) {
        this.activatedRoute.data.subscribe(data => {
            this.page = data.pagingParams ? data.pagingParams : newPage({}, ['fecha', 'DESC']);
        });
    }

    ngOnInit(): void {
        this.proveedorService.findAll({
            limit: 0,
            activo: true
        }).subscribe(
            (res) => this.proveedores = res.body.rows
        );

        this.findAll();
    }

    onFilter(): void {
        this.page.filter = {};

        if (this.myForm.get(['proveedorId'])!.value) {
            Object.assign(this.page.filter, {
                proveedorId: this.myForm.get(['proveedorId'])!.value
            });
        }

        if (this.myForm.get(['desde'])!.value) {
            Object.assign(this.page.filter, {
                desde: this.myForm.get(['desde'])!.value
            });
        }

        if (this.myForm.get(['hasta'])!.value) {
            Object.assign(this.page.filter, {
                hasta: this.myForm.get(['hasta'])!.value + ' 23:59'
            });
        }

        this.findAll();
    }

    findAll(): void {
        this.transition();
        this.loading = true;
        this.comprasService.findAll({
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

    setPage(pageInfo: any): void {
        this.page.offset = pageInfo.offset;
        this.findAll();
    }

    clearFilter(): void {
        this.page.filter = {};
        this.page = newPage(this.page.filter, this.page.order);
        this.myForm.get(['proveedorId'])!.setValue(null);
        this.myForm.get(['desde'])!.setValue(null);
        this.myForm.get(['hasta'])!.setValue(null);
        this.findAll();
    }

    transition(): void {
        this.router.navigate(['/compras'],
            {
                queryParams: {
                    page: JSON.stringify(this.page)
                },
                replaceUrl: true
            });
    }

    calculateMonto(comprasItems: ICompraItem[]): number {
        return comprasItems.reduce(
            (a: number, b: ICompraItem) => a + (b.precio * b.cantidad),
            0
        );
    }
}
