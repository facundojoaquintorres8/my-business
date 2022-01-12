import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import { IPage, newPage, totalPages } from '../shared/page.models';
import {AuthService} from './auth.service'
import {HttpResponse} from "@angular/common/http"
import {ActivatedRoute, Router} from "@angular/router";
import {IUsuarioLogin, IUsuarioClave} from "../usuarios/usuarios.models";
import {Observable} from "rxjs";
import {ILoginUser} from "./auth.models";
import {ToastService} from '../toast/toast.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit{

  isSaving = false;
  mensaje? : string;
  myForm = this.fb.group({
    usuario: [null],
    clave: []
  });
  constructor(
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private toastService: ToastService
  ) {}
  ngOnInit() {
    this.auth.logout();
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
        this.auth.onLoginSuccess(res.body!);
        this.router.navigate(['/home']);
      },
      (err) => {
        this.isSaving = false;
        console.log(err.error.mensaje);
        if(err.status === 403 || err.status === 401){
          this.mensaje = err.error.mensaje;
          this.toastService.changeMessage(
            {
              showErrorToast: true,
              errorMessage: err.error.mensaje,
            }
          );
        }
      }
    );
  }
  previousState():void{
    window.history.back();
  }
  login(){
    this.isSaving = true;
    this.subscribeToSaveResponse(this.auth.login(this.getUserData()))
  }

}


