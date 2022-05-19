import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DeleteProveedorModalComponent } from './delete-proveedores-modal.component';
import { ProveedorService } from './proveedores.service';
import { IProveedor } from './proveedores.models';
import { FormBuilder } from '@angular/forms';
import { IPage, newPage, totalPages } from '../shared/page.models';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-proveedores',
    templateUrl: './proveedores.component.html'
})
export class ProveedorComponent implements OnInit {
    collapsedFilter = false;
    page!: IPage;
    myForm = this.fb.group({
        razonSocial: [null],
        cuitDni: [null],
        direccion: [null],
        verInactivos: [null],
    });
    rows: IProveedor[] = [];
    loading = false;
    private ngbModalRef: NgbModalRef | undefined;

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private productoService: ProveedorService,
        private modalService: NgbModal,
        private fb: FormBuilder,
    ) {
        this.activatedRoute.data.subscribe(data => {
            this.page = data.pagingParams ? data.pagingParams : newPage({ activo: true }, ['razonSocial', 'ASC']);
        });
    }

    ngOnInit(): void {
        this.findAll();

        if (this.page.filter.razonSocial) {
            this.myForm.get(['razonSocial'])!.setValue(this.page.filter.razonSocial);
        }
        if (this.page.filter.cuitDni) {
            this.myForm.get(['cuitDni'])!.setValue(this.page.filter.cuitDni);
        }
        if (this.page.filter.direccion) {
            this.myForm.get(['direccion'])!.setValue(this.page.filter.direccion);
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
        if (this.myForm.get(['razonSocial'])!.value) {
            Object.assign(this.page.filter, {
                razonSocial: this.myForm.get(['razonSocial'])!.value.toLowerCase()
            });
        }
        if (this.myForm.get(['cuitDni'])!.value) {
            Object.assign(this.page.filter, {
                cuitDni: this.myForm.get(['cuitDni'])!.value.toLowerCase()
            });
        }
        if (this.myForm.get(['direccion'])!.value) {
            Object.assign(this.page.filter, {
                direccion: this.myForm.get(['direccion'])!.value.toLowerCase()
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
        this.myForm.get(['razonSocial'])!.setValue('');
        this.myForm.get(['cuitDni'])!.setValue('');
        this.myForm.get(['direccion'])!.setValue('');
        this.myForm.get(['verInactivos'])!.setValue(false);
        this.findAll();
    }

    setPage(pageInfo: any): void {
        this.page.offset = pageInfo.offset;
        this.findAll();
    }

    delete(id: number): void {
        this.ngbModalRef = this.modalService.open(DeleteProveedorModalComponent, { size: 'lg', backdrop: 'static' });
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
        this.router.navigate(['/proveedores'], {
            queryParams: {
                page: JSON.stringify(this.page)
            },
            replaceUrl: true
        });
    }
}
