import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { VentasService } from './ventas.service';
import { IVenta, IVentaCreate, IVentaItem } from './ventas.model';
import { ICliente } from '../clientes/clientes.models';
import { ProductoService } from '../productos/productos.service';
import { getLastPrecioVenta, IProducto } from '../productos/productos.models';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { AddQuickClienteModalComponent } from '../clientes/add-quick-clientes-modal.component';
import { ClientesService } from '../clientes/clientes.service';

@Component({
    selector: 'app-create-ventas',
    templateUrl: './create-ventas.component.html'
})
export class CreateVentaComponent implements OnInit {
    isSaving = false;
    clientes: ICliente[] = [];
    productos: IProducto[] = [];
    myForm = this.fb.group({
        fecha: [new Date().toISOString().substring(0, 10), [Validators.required]],
        cliente: [null, [Validators.required]],
        ventasItems: this.fb.array([
            this.initItems()
        ])
    });
    private ngbModalRef: NgbModalRef | undefined;

    constructor(
        private fb: FormBuilder,
        private ventasService: VentasService,
        private clienteService: ClientesService,
        private productoService: ProductoService,
        private modelService: NgbModal
    ) {
    }

    get ventasItems(): any {
        return this.myForm.get('ventasItems') as FormArray;
    }

    ngOnInit(): void {
        this.clienteService.findAll({ limit: 0, activo: true }).subscribe(
            (res) => this.clientes = res.body.rows
        );

        this.productoService.findAll({ limit: 0, activo: true }).subscribe(
            (res) => this.productos = res.body.rows
        );
    }

    initItems(): FormGroup {
        return this.fb.group({
            producto: [null, [Validators.required]],
            cantidad: [null, [Validators.required, Validators.min(0.00001)]],
            precio: [null, [Validators.required, Validators.min(0)]],
        });
    }

    addItem(): void {
        const control = <FormArray>this.myForm.controls['ventasItems'];
        control.push(this.initItems());
    }

    deleteItem(index: any): void {
        this.ventasItems.removeAt(index);
    }

    getControls(): AbstractControl[] {
        return (<FormArray>this.myForm.get('ventasItems')).controls;
    }

    addCliente(): void {
        this.ngbModalRef = this.modelService.open(AddQuickClienteModalComponent, { size: 'md', backdrop: 'static' });
        this.ngbModalRef.result.then(
            res => {
                this.ngbModalRef = undefined;
                this.clientes.push(res);
                this.clientes.sort((n1, n2) => {
                    if (n1.apellido.toLowerCase() > n2.apellido.toLowerCase()) {
                        return 1;
                    }
                    if (n1.apellido.toLowerCase() < n2.apellido.toLowerCase()) {
                        return -1;
                    }
                    return 0;
                });
                this.myForm.get(['cliente'])!.setValue(res);
            },
            () => {
                this.ngbModalRef = undefined;
            }
        );
    }

    onProductoChange(item: IVentaItem) {
        // actualizo precio según fecha
    }

    getPrecioByFecha(idProducto: number): number {
        // this.productoService.getPrecioByFecha(idProducto, this.myForm.get(['fecha'])!.value).subscribe(
        //     (res: any) => {
        //         return res.precio;
        //     }, () => { return 0; }
        // )
        return 0;
    }

    previousState(): void {
        window.history.back();
    }

    save(): void {
        this.isSaving = true;
        this.subscribeToSaveResponse(this.ventasService.create(this.createFromForm()));
    }

    private createFromForm(): IVentaCreate {
        return {
            fecha: this.myForm.get(['fecha'])!.value,
            cliente: this.myForm.get(['cliente'])!.value,
            formaPago: this.myForm.get(['formaPago'])!.value,
            porcentajeDescuento: this.myForm.get(['porcentajeDescuento'])!.value,
            total: this.getTotalVenta(),
            ventasItems: this.myForm.get(['ventasItems'])!.value,
        };
    }

    private getTotalVenta(): number {
        let total: number = 0;
        this.myForm.get(['ventasItems'])!.value.forEach((item: IVentaItem) => {
            total += getLastPrecioVenta(item.producto);
            ;
        });
        return total;
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IVenta>>): void {
        result.subscribe(
            () => this.previousState(),
            () => this.isSaving = false
        );
    }
}
