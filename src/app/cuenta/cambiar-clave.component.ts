import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import { IPage, newPage, totalPages } from '../shared/page.models';
import { ActivatedRoute, Router } from '@angular/router';
import {IUser, IUsuario, IUsuarioClave} from '../usuarios/usuarios.models';
import {CuentaService} from './cuenta.service'
import {Observable} from "rxjs";
import {HttpResponse} from "@angular/common/http"
import {ValidarClaveRepetida} from "../shared/custom-validators";
import {AuthService} from "../auth/auth.service";

@Component({
  selector: 'app-cambiar-clave',
  templateUrl: './cambiar-clave.component.html'
})
export class CambiarClaveComponent implements  OnInit{

  isSaving = false;
  usuarioClave!: IUsuarioClave
  expresion : string = '^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]){8,32}$';
  mensaje? : string;
  user!: IUser;

  myForm = this.fb.group({
    claveVieja:[null, [Validators.required]],
    claveNueva:[null, [Validators.required,Validators.pattern('^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,32}$')]],
    claveNuevaRepetida:[null, [Validators.required,ValidarClaveRepetida]]
  });

  constructor(
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private cuentaService: CuentaService,
    private authService: AuthService
  )
  {}

  ngOnInit() {
    this.user = this.authService.getSessionUser();
  }

  clearFormInput() {
    this.myForm.get(['claveNuevaRepetida'])?.reset();
  }
  save(){
    this.isSaving = true;
    this.usuarioClave = this.getUserData();
    this.subscribeToSaveResponse(this.cuentaService.updatePassword(this.usuarioClave))
    this.clearFormInput();
  }
  private getUserData():IUsuarioClave {
    return{
      id: this.user.id,
      claveVieja: this.myForm.get(['claveVieja'])!.value,
      claveNueva: this.myForm.get(['claveNueva'])!.value,
      claveNuevaRepetida: this.myForm.get(['claveNuevaRepetida'])!.value
    };
  }
  private subscribeToSaveResponse(result: Observable<HttpResponse<IUsuarioClave>>): void {
    result.subscribe(
      (res) => this.previousState(),
      (err) =>{
        this.isSaving = false;
        this.mensaje = err.error.msg;
      }
    );
  }
  previousState():void{
    window.history.back();
  }
}


