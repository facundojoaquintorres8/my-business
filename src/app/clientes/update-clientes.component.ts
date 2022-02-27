// tslint:disable-next-line:eofline
import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ClientesService } from './clientes.service';
import { ICliente } from './clientes.models';

@Component({
  selector: 'app-update-clientes',
  templateUrl: './update-clientes.component.html'
})
export class UpdateClientesComponent implements OnInit {

  isSaving = false;
  value = '';

  myForm = this.fb.group({
    dni: [null, [Validators.required]],
    nombre: [null, [Validators.required]],
    apellido: [null, [Validators.required]],
    tipo: [null, [Validators.required]],
    telefono: [null],
    direccion: [null],
    activo: [null],
  });

  constructor(
    private clienteService: ClientesService,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,

  ) { }

  ngOnInit(): void {
    const dni = this.activatedRoute.snapshot.paramMap.get('dni');
    if (dni) {
      this.clienteService.find(dni).subscribe((res: HttpResponse<ICliente>) => {
        this.updateForm(res.body!);
        this.value = res.body!.dni
      });

    }
  }

  updateForm(cliente: ICliente): void {
    this.myForm.patchValue({
      dni: cliente.dni,
      nombre: cliente.nombre,
      apellido: cliente.apellido,
      telefono: cliente.telefono,
      direccion: cliente.direccion,
      tipo: cliente.tipo.toString(),
      activo: cliente.activo,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const cliente = this.createFromForm();
    if (this.value) {
      this.subscribeToSaveResponse(this.clienteService.update(cliente));
    } else {
      this.subscribeToSaveResponse(this.clienteService.create(cliente));
    }
  }

  private createFromForm(): ICliente {
    return {
      dni: this.myForm.get(['dni'])!.value,
      nombre: this.myForm.get(['nombre'])!.value,
      apellido: this.myForm.get(['apellido'])!.value,
      telefono: this.myForm.get(['telefono'])!.value,
      direccion: this.myForm.get(['direccion'])!.value,
      tipo: this.myForm.get(['tipo'])!.value,
      activo: this.myForm.get(['activo'])!.value,
    };
  }

  private subscribeToSaveResponse(result: Observable<HttpResponse<ICliente>>): void {
    result.subscribe(
      () => this.previousState(),
      () => this.isSaving = false
    );
  }
}
