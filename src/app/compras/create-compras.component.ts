import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { ComprasService } from './compras.service';
import { ICompra, ICompraCreate } from './compras.model';
import { IProveedor } from '../proveedores/proveedores.models';
import { ProveedorService } from '../proveedores/proveedores.service';
import { ProductoService } from '../productos/productos.service';
import { IProducto } from '../productos/productos.models';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { AddQuickProductoModalComponent } from '../productos/add-quick-productos-modal.component';
import { AddQuickProveedorModalComponent } from '../proveedores/add-quick-proveedores-modal.component';

@Component({
  selector: 'app-create-compras',
  templateUrl: './create-compras.component.html'
})
export class CreateCompraComponent implements OnInit {
  private ngbModalRef: NgbModalRef | undefined;
  isSaving = false;

  proveedores: IProveedor[] = [];
  productos: IProducto[] = [];

  myForm = this.fb.group({
    fecha: [new Date().toISOString().substring(0, 10), [Validators.required]],
    proveedor: [null, [Validators.required]],
    itemsCompras: this.fb.array([
      this.initItems()
    ])
  });

  constructor(
    private fb: FormBuilder,
    private comprasService: ComprasService,
    private proveedorService: ProveedorService,
    private productoService: ProductoService,
    private modelService: NgbModal
  ) { }

  ngOnInit(): void {
    this.proveedorService.findAll({ limit: 0, activo: true }).subscribe(
      (res) => this.proveedores = res.body.rows
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
    const control = <FormArray>this.myForm.controls['itemsCompras'];
    control.push(this.initItems());
  }

  deleteItem(index: any): void  {
    this.itemsCompras.removeAt(index);
  }

  get itemsCompras() {
    return this.myForm.get('itemsCompras') as FormArray;
  }

  getControls(): AbstractControl[] {
    return (<FormArray>this.myForm.get('itemsCompras')).controls;
  }

  addProveedor(): void {
    this.ngbModalRef = this.modelService.open(AddQuickProveedorModalComponent, { size: 'md', backdrop: 'static' });
    this.ngbModalRef.result.then(
      res => {
        this.ngbModalRef = undefined;
        this.proveedores.push(res);
        this.proveedores.sort((n1, n2) => {
          if (n1.razonSocial.toLowerCase() > n2.razonSocial.toLowerCase()) {
            return 1;
          }
          if (n1.razonSocial.toLowerCase() < n2.razonSocial.toLowerCase()) {
            return -1;
          }
          return 0;
        });
        this.myForm.get(['proveedor'])!.setValue(res);
      },
      () => {
        this.ngbModalRef = undefined;
      }
    );
  }

  addProducto(index: any): void {
    this.ngbModalRef = this.modelService.open(AddQuickProductoModalComponent, { size: 'md', backdrop: 'static' });
    this.ngbModalRef.result.then(
      res => {
        this.ngbModalRef = undefined;
        this.productos.push(res);
        this.productos.sort((n1, n2) => {
          if (n1.descripcion.toLowerCase() > n2.descripcion.toLowerCase()) {
            return 1;
          }
          if (n1.descripcion.toLowerCase() < n2.descripcion.toLowerCase()) {
            return -1;
          }
          return 0;
        });
        console.log(res);
        this.myForm.get('itemsCompras.' + index)?.get(['producto'])!.setValue(res);
      },
      () => {
        this.ngbModalRef = undefined;
      }
    );
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    console.log(this.createFromForm());
    this.isSaving = true;
    this.subscribeToSaveResponse(this.comprasService.create(this.createFromForm()));
  }

  private createFromForm(): ICompraCreate {
    return {
      fecha: this.myForm.get(['fecha'])!.value,
      proveedor: this.myForm.get(['proveedor'])!.value,
      itemsCompras: this.myForm.get(['itemsCompras'])!.value,
    };
  }

  private subscribeToSaveResponse(result: Observable<HttpResponse<ICompra>>): void {
    result.subscribe(
      () => this.previousState(),
      () => this.isSaving = false
    );
  }
}
