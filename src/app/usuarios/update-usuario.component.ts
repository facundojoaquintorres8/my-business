import {Component, OnInit} from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import {IUsuario} from './usuarios.models';
import {UsuariosService} from './usuarios.service';
import {toNumbers} from "@angular/compiler-cli/src/diagnostics/typescript_version";
import {IProducto} from "../productos/productos.models";

@Component({
  selector: 'app-update-usuario',
  templateUrl: './update-usuario.component.html'
})
export class UpdateUsuarioComponent implements OnInit{

  isSaving = false;

  myForm = this.fb.group({
    id: [],
    usuario: [],
    password: [],
    rol: [],
    activo: []
  });

  constructor(
    private usuarioService: UsuariosService,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
  ) {
  }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id){
      this.usuarioService.find(parseInt(id)).subscribe(
        (res:HttpResponse<IUsuario>) => this.updateForm(res.body!)
      );
    }
  }
  updateForm(usuario: IUsuario){
    this.myForm.patchValue({
      id: usuario.id,
      usuario: usuario.usuario,
      password: usuario.password,
      rol: usuario.rol,
      activo: usuario.activo
    });
  }
  previousState(): void {
    window.history.back();
  }

  save(): void{
    this.isSaving = true;
    const usuario = this.createFromForm();
    if (usuario.id){
      this.subscribeToSaveResponse(this.usuarioService.update(usuario));
    }else{
      this.subscribeToSaveResponse(this.usuarioService.create(usuario));
    }

  }

  private createFromForm(): IUsuario{
    return {
      id: this.myForm.get(['id'])!.value,
      usuario: this.myForm.get(['usuario'])!.value,
      password: this.myForm.get(['password'])!.value,
      rol: this.myForm.get(['rol'])!.value,
      activo: this.myForm.get(['activo'])!.value
    }
  }
  private subscribeToSaveResponse(result: Observable<HttpResponse<IUsuario>>): void {
    result.subscribe(
      () => this.previousState(),
      () => this.isSaving = false
    );
  }

}
