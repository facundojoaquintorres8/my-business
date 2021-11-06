import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, Validators} from '@angular/forms';
import { IPage, newPage, totalPages } from '../shared/page.models';
import { ActivatedRoute, Router } from '@angular/router';
import {IUsuario, IUsuarioPassword} from './usuarios.models';
import {UsuariosService} from './usuarios.service';
import {Observable} from "rxjs";
import {HttpResponse} from "@angular/common/http";
import {validate} from "codelyzer/walkerFactory/walkerFn";

@Component({
  selector: 'app-cambiar-password',
  templateUrl: './cambiar-password.component.html'
})
export class CambiarPasswordComponent{

  isSaving = false;
  usuario!: IUsuarioPassword

  myForm = this.fb.group({
    claveVieja:[null, Validators.required],
    claveNueva:[null, [Validators.required,Validators.pattern('^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[*.!@$%^&(){}[]:;<>,.?/~_+-=|\\]).{8,32}$')]],
    claveNuevaRepetida:[]
  });

  constructor(
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private usuarioService: UsuariosService
  )
  {}

  save(){
    this.isSaving = true;
    this.usuario = this.getUserData();
    console.log(this.usuario);
    this.subscribeToSaveResponse(this.usuarioService.updatePassword(this.usuario))
  }
  private getUserData():IUsuarioPassword {
    return{
      id: parseInt(this.activatedRoute.snapshot.paramMap.get('id')!),
      password: this.myForm.get(['claveNueva'])!.value
    };


  }
  private subscribeToSaveResponse(result: Observable<HttpResponse<IUsuarioPassword>>): void {
    result.subscribe(
      () => this.previousState(),
      () => this.isSaving = false
    );
  }
  previousState():void{
    window.history.back();
  }
}

export function ValidateUrl(control: AbstractControl) {
  if (!control.value.startsWith('https') || !control.value.includes('.io')) {
    return { validUrl: true };
  }
  return null;
}
