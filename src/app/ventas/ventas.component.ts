import {Component, OnInit} from '@angular/core';
import {IVenta, IVentaItem} from './ventas.model';
import {IPage, newPage, totalPages} from '../shared/page.models';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder} from '@angular/forms';
import {VentasService} from './ventas.service';
import {ICliente} from '../clientes/clientes.models';
import {ClientesService} from '../clientes/clientes.service';

@Component({
    selector: 'app-ventas',
    templateUrl: './ventas.component.html'
})
export class VentasComponent implements OnInit {

    collapsedFilter = false;
    page!: IPage;
    myForm = this.fb.group({
        clienteId: [null],
        desde: [null],
        hasta: [null]
    });
    rows: IVenta[] = [];
    loading = false;

    clientes: ICliente[] = [];

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private fb: FormBuilder,
        private ventasService: VentasService,
        private clienteService: ClientesService,
    ) {
        this.activatedRoute.data.subscribe(data => {
            this.page = data.pagingParams ? data.pagingParams : newPage({}, ['fecha', 'DESC']);
        });
    }

    ngOnInit(): void {
        this.clienteService.findAll({
            limit: 0,
            activo: true
        }).subscribe(
            (res) => this.clientes = res.body.rows
        );

        this.findAll();
    }

    onFilter(): void {
        this.page.filter = {};

        if (this.myForm.get(['clienteId'])!.value) {
            Object.assign(this.page.filter, {
                clienteId: this.myForm.get(['clienteId'])!.value
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
        this.ventasService.findAll({
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
        this.myForm.get(['clienteId'])!.setValue(null);
        this.myForm.get(['desde'])!.setValue(null);
        this.myForm.get(['hasta'])!.setValue(null);
        this.findAll();
    }

    transition(): void {
        this.router.navigate(['/ventas'],
            {
                queryParams: {
                    page: JSON.stringify(this.page)
                },
                replaceUrl: true
            });
    }

    calculateMonto(ventasItems: IVentaItem[]): number {
        return ventasItems.reduce(
            (a: number, b: IVentaItem) => a + (b.precio * b.cantidad),
            0
        );
    }
}
