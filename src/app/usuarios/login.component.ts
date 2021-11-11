import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import { IPage, newPage, totalPages } from '../shared/page.models';
import {UsuariosService} from './usuarios.service';
import {HttpResponse} from "@angular/common/http"
import {ActivatedRoute} from "@angular/router";
import {IUsuarioLogin, IUsuarioPassword} from "./usuarios.models";
import {Observable} from "rxjs";


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
    private usuarioService: UsuariosService
  ) {
  }
  private getUserData():IUsuarioLogin {
    return{
      usuario: this.myForm.get(['usuario'])!.value,
      password: this.myForm.get(['clave'])!.value
    };
  }
  private subscribeToSaveResponse(result: Observable<HttpResponse<IUsuarioLogin>>): void {
    result.subscribe(
      (res) =>{
        console.log('bien', res);
        this.previousState();
      } ,
      (err) => {
        this.isSaving = false;
        console.log('algo paso: ', err.error.msg);
        this.mensaje = err.error.msg;

      }
    );
  }
  previousState():void{
    window.history.back();
  }
  save(){
    this.isSaving = true;
    const usuario = this.getUserData();
    this.subscribeToSaveResponse(this.usuarioService.login(usuario))
  }
}
