import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import { IPage, newPage, totalPages } from '../shared/page.models';
import {AuthService} from './auth.service'
import {HttpResponse} from "@angular/common/http"
import {ActivatedRoute} from "@angular/router";
import {IUsuarioLogin, IUsuarioClave} from "../usuarios/usuarios.models";
import {Observable} from "rxjs";
import {ILoginUser} from "./auth.models";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent{

  isSaving = false;
  mensaje? : string;

  myForm = this.fb.group({
    usuario: [null],
    clave: []
  });


  constructor(
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private auth: AuthService
  ) {
  }
  private getUserData():IUsuarioLogin {
    return{
      usuario: this.myForm.get(['usuario'])!.value,
      clave: this.myForm.get(['clave'])!.value
    };
  }
  private subscribeToSaveResponse(result: Observable<HttpResponse<ILoginUser>>): void {
    result.subscribe(
      (res) =>{
        console.log('res body', res.body);
        console.log('token', res.body?.token);
        console.log('token', res.body?.user);
        this.auth.onLoginSuccess(res.body!);
       // this.previousState();

      } ,
      (err) => {
        this.isSaving = false;
        console.log('Ocurrio un error: ', err.error.msg);
        this.mensaje = err.error.msg;

      }
    );
  }
  previousState():void{
    window.history.back();
  }
  login(){
    this.isSaving = true;
    const usuario = this.getUserData();
    this.subscribeToSaveResponse(this.auth.login(this.getUserData()))
  }

}


