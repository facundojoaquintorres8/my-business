import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { ComprasService } from './compras.service';
import { ICompra, ICompraCreate, ICompraItem } from './compras.model';
import { IProveedor } from '../proveedores/proveedores.models';
import { ProveedorService } from '../proveedores/proveedores.service';
import { ProductoService } from '../productos/productos.service';
import { IProducto } from '../productos/productos.models';

@Component({
  selector: 'app-create-compras',
  templateUrl: './create-compras.component.html'
})
export class CreateCompraComponent implements OnInit {
  isSaving = false;

  // items: ICompraItem[] = [];
  proveedores: IProveedor[] = [];
  productos: IProducto[] = [];
  // items: FormArray = new FormArray([]);

  myForm = this.fb.group({
    fecha: [new Date(), [Validators.required]], // TODO: set today
    proveedorId: [null, [Validators.required]],
    // items: this.fb.array([]),
      items: new FormArray([
        this.fb.group({
          producto: [null, [Validators.required]],
          cantidad: [null, [Validators.required, Validators.min(0)]],
          precio: [null, [Validators.required, Validators.min(0)]]
        })
     ])
    // items: this.fb.array(
    //   [
    //     this.fb.group({
    //       producto: [null, [Validators.required]],
    //       cantidad: [null, [Validators.required, Validators.min(0)]]
    //       // precio: [null, [Validators.required, Validators.min(0)]],
    //     })
    //   ]
    // )
  });

  constructor(
    private fb: FormBuilder,
    private comprasService: ComprasService,
    private proveedorService: ProveedorService,
    private productoService: ProductoService,
  ) { }

  ngOnInit(): void {
    this.proveedorService.findAll({
      limit: 0,
      activa: true
    }).subscribe(
      (res) => this.proveedores = res.body.rows
    );

    this.productoService.findAll({
      limit: 0,
      activa: true
    }).subscribe(
      (res) => this.productos = res.body.rows
    );

    // this.addItem();
  }

  previousState(): void {
    window.history.back();
  }

  // addItem1() {
  //   this.items.push(new FormControl(
  //     this.fb.group({
  //       producto: [null, [Validators.required]],
  //       cantidad: [null, [Validators.required, Validators.min(0)]]
  //       // precio: [null, [Validators.required, Validators.min(0)]],
  //     })
  //   ));
  // }

  // deleteItem2(i: number) {
  //   this.items.controls = this.items.controls.filter(x => x !== this.items.controls[i]);
  // }

  get items() {
    return this.myForm.get('items') as FormArray;
  }

  addItem() {
    const producto = new FormControl('producto', [Validators.required]);
    const cantidad = new FormControl('cantidad', [Validators.required, Validators.min(0)]);
    const stock = new FormControl('stock', [Validators.required, Validators.min(0)]);
    this.items.controls.push(
      new FormGroup({
        producto, cantidad, stock
      })
    );
    // this.items.patchValue(
    //   [producto, cantidad, stock]
    // )
    // this.items.push(
    //   this.fb.group({
    //     cantidad: [null, Validators.required]
    //   })
    // );

    //  this.items.controls.push(this.fb.group({
    //    cantidad: [null, Validators.required]
    //  }));

    //  this.items.controls = [...this.items.controls];
  }

  deleteItem(index: any) {
    // console.log(index);
    this.items.removeAt(index);
  }

  // addItem2() {
  //   const it = (this.myForm.get('items') as FormArray);
  //   it.push(this.fb.group({
  //     cantidad: [null, Validators.required]
  //   }));
  // }

  // deleteItem2(i: number) {
  //   const fa = (this.myForm.get('items') as FormArray);
  //   console.log(fa);
  //   // fa.removeAt(i);
  //   // if(fa.length===0) this.addItem();
  // }

  getControls() {
    return (<FormArray>this.myForm.get('items')).controls;
  }

  // hasError(i: number):boolean {
  //   // const control = <FormArray>this.form.controls['emailsArray'];
  //   return this.items.controls[i].get('cantidad')!.hasError('invalidEmail');
  // }
  // isTouched(i: number):boolean {
  //   const control = this.items.controls[i].get('cantidad');
  //   return control !== null && control.touched;
  // }

  save(): void {
    this.isSaving = true;
    this.subscribeToSaveResponse(this.comprasService.create(this.createFromForm()));
  }

  private createFromForm(): ICompraCreate {
    return {
      fecha: this.myForm.get(['fecha'])!.value,
      proveedorId: this.myForm.get(['proveedorId'])!.value,
      items: this.myForm.get(['items'])!.value,
    };
  }

  // private createFromFormItems(): IComprasItems {
  //   return {
  //     id: this.myForm.get(['id'])!.value,
  //     precio: this.myForm.get(['precio'])!.value,
  //     cantidad: this.myForm.get(['cantidad'])!.value,
  //     producto: this.myForm.get(['producto'])!.value, // TODO: object 
  //   };
  // }

  private subscribeToSaveResponse(result: Observable<HttpResponse<ICompra>>): void {
    result.subscribe(
      () => this.previousState(),
      () => this.isSaving = false
    );
  }
}
