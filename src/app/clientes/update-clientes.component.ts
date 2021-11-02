// tslint:disable-next-line:eofline
import {Component, OnInit} from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import {ClientesService} from './clientes.service';
import {ICliente} from './clientes.models';


@Component({
  selector: 'app-update-clientes',
  templateUrl: './update-clientes.component.html'
})
export class UpdateClientesComponent implements OnInit{

  isSaving = false;
  isUpdate = false;


  myForm = this.fb.group({
    dni: [null, [Validators.required]],
    nombre: [null, [Validators.required]],
    apellido: [null, [Validators.required]],
    telefono: [null, [Validators.required]],
    direccion: [null, [Validators.required]],
    esMayorista: [null],
    activo: [null],
  });

  constructor(
    private clienteService: ClientesService,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,

  ) {
  }

  ngOnInit(): void {
    const dni = this.activatedRoute.snapshot.paramMap.get('dni');
    if (dni){
      this.isUpdate = true;
      this.clienteService.find(dni).subscribe((res: HttpResponse<ICliente>) => this.updateForm(res.body!));
    }
  }
  updateForm(cliente: ICliente): void{
    this.myForm.patchValue({
      dni: cliente.dni,
      nombre: cliente.nombre,
      apellido: cliente.apellido,
      telefono: cliente.telefono,
      direccion: cliente.direccion,
      esMayorista: cliente.esMayorista,
      activo: cliente.activo,
    });
  }
  previousState(): void{
    window.history.back();
  }
  save(): void{
    this.isSaving = true;
    const cliente = this.createFromForm();
    if (!cliente.esMayorista){
      cliente.esMayorista = false;
      /*
      * CONSULTA:
      * Es la unica forma que encontre de que me asigne por
      * defecto falso en esMayorista
      * */
    }
    console.log('Valor de esMayorista: ', cliente.esMayorista);
    if (this.isUpdate){
      this.subscribeToSaveResponse(this.clienteService.update(cliente));
      this.isUpdate = false;
    }else{
      this.subscribeToSaveResponse(this.clienteService.create(cliente));
    }
  }
  private createFromForm(): ICliente{
    return {
      dni: this.myForm.get(['dni'])!.value,
      nombre: this.myForm.get(['nombre'])!.value,
      apellido: this.myForm.get(['apellido'])!.value,
      telefono: this.myForm.get(['telefono'])!.value,
      direccion: this.myForm.get(['direccion'])!.value,
      esMayorista: this.myForm.get(['esMayorista'])!.value,
      activo: this.myForm.get(['activo'])!.value,
    };
  }
  private subscribeToSaveResponse(result: Observable<HttpResponse<ICliente>>): void{
    result.subscribe(
      () => this.previousState(),
      () => this.isSaving = false
    );
  }
}
