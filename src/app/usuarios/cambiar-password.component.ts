import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import { IPage, newPage, totalPages } from '../shared/page.models';
import { ActivatedRoute, Router } from '@angular/router';
import {IUsuario, IUsuarioPassword} from './usuarios.models';
import {UsuariosService} from './usuarios.service';
import {Observable} from "rxjs";
import {HttpResponse} from "@angular/common/http"

@Component({
  selector: 'app-cambiar-password',
  templateUrl: './cambiar-password.component.html'
})
export class CambiarPasswordComponent{

  isSaving = false;
  usuarioPassword!: IUsuarioPassword
  expresion : string = '^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]){8,32}$';


  myForm = this.fb.group({
    claveVieja:[null, [Validators.required, ValidateUrl]],
    claveNueva:[null, [Validators.required,Validators.pattern('^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,32}$')]],
    claveNuevaRepetida:[null, Validators.required]
  });

  constructor(
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private usuarioService: UsuariosService
  )
  {}

  save(){
    this.isSaving = true;
    this.usuarioPassword = this.getUserData();
    console.log(this.usuarioPassword);
    this.subscribeToSaveResponse(this.usuarioService.updatePassword(this.usuarioPassword))
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
  public hola(){
    console.log('hola');
  }
}

export function ValidateUrl(control: AbstractControl) {
  /*if (!control.value.startsWith('https') || !control.value.includes('.io')) {
    return { validUrl: true };
  }*/
  console.log('Control: ',control.value)


}
