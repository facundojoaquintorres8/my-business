import {Component, OnInit} from '@angular/core';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder} from '@angular/forms';
import {IPage, newPage, totalPages} from '../shared/page.models';
import {ActivatedRoute, Router} from '@angular/router';
import {ClientesService} from './clientes.service';
import {ICliente} from './clientes.models';
import {DeleteClientesModalComponent} from './delete-clientes-modal.component';

@Component({
    selector: 'app-clientes',
    templateUrl: './clientes.component.html',
    styleUrls: ['./clientes.component.scss']
})
export class ClientesComponent implements OnInit {
    collapsedFilter = false;
    page!: IPage;
    myForm = this.fb.group({
        dni: [null],
        nombre: [null],
        apellido: [null],
        verInactivos: [null],
        tipo: [null]
    });
    rows: ICliente[] = [];
    loading = false;
    private ngbModalRef: NgbModalRef | undefined;

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private clientesService: ClientesService,
        private modelService: NgbModal,
        private fb: FormBuilder,
    ) {
        this.activatedRoute.data.subscribe(data => {
            this.page = data.pagingParams ? data.pagingParams : newPage({activo: true}, ['apellido', 'ASC']);
        });
    }

    ngOnInit(): void {
        this.findAll();

        if (this.page.filter.nombre) {
            this.myForm.get(['nombre'])!.setValue(this.page.filter.nombre);
        }
        if (this.page.filter.apellido) {
            this.myForm.get(['apellido'])!.setValue(this.page.filter.apellido);
        }
        if (this.page.filter.activo) {
            this.myForm.get(['verInactivos'])!.setValue(false);
        } else {
            this.myForm.get(['verInactivos'])!.setValue(true);
        }
        if (this.page.filter.tipo) {
            this.myForm.get(['tipo'])!.setValue(true);
        }
    }

    findAll(): void {
        this.transition();
        this.loading = true;
        this.clientesService.findAll({
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

    onFilter(): void {
        this.page.filter = {};
        if (this.myForm.get(['dni'])!.value) {
            Object.assign(this.page.filter, {
                dni: this.myForm.get(['dni'])!.value.toLowerCase()
            });
        }
        if (this.myForm.get(['nombre'])!.value) {
            Object.assign(this.page.filter, {
                nombre: this.myForm.get(['nombre'])!.value.toLowerCase()
            });
        }
        if (this.myForm.get(['apellido'])!.value) {
            Object.assign(this.page.filter, {
                apellido: this.myForm.get(['apellido'])!.value.toLowerCase()
            });
        }
        if (!this.myForm.get(['verInactivos'])!.value) {
            Object.assign(this.page.filter, {
                activo: true
            });
        }
        if (this.myForm.get(['tipo'])!.value) {
            Object.assign(this.page.filter, {
                tipo: this.myForm.get(['tipo'])!.value
            });
        }
        this.findAll();
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
        this.page.filter = {activo: true};
        this.page = newPage(this.page.filter, this.page.order);
        this.myForm.get(['dni'])!.setValue('');
        this.myForm.get(['nombre'])!.setValue('');
        this.myForm.get(['verInactivos'])!.setValue(false);
        this.findAll();
    }

    delete(dni: string): void {
        this.ngbModalRef = this.modelService.open(DeleteClientesModalComponent, {size: 'lg', backdrop: 'static'});
        this.ngbModalRef.componentInstance.dni = dni;
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
        this.router.navigate(['/clientes'], {
            queryParams: {
                page: JSON.stringify(this.page)
            },
            replaceUrl: true
        });
    }
}
