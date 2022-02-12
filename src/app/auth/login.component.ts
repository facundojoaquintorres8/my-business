import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpResponse } from "@angular/common/http";
import { Router } from "@angular/router";
import { IUsuarioLogin } from "../usuarios/usuarios.models";
import { Observable } from "rxjs";
import { ILoginUser } from "./auth.models";
import { ToastService } from '../toast/toast.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  isSaving = false;
  mensaje?: string;
  myForm = this.fb.group({
    usuario: [null],
    clave: []
  });
  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private toastService: ToastService
  ) { }

  ngOnInit(): void {
    this.auth.logout();
  }

  private getUserData(): IUsuarioLogin {
    return {
      usuario: this.myForm.get(['usuario'])!.value,
      clave: this.myForm.get(['clave'])!.value
    };
  }

  private subscribeToSaveResponse(result: Observable<HttpResponse<ILoginUser>>): void {
    result.subscribe(
      (res) => {
        this.auth.onLoginSuccess(res.body!);
        this.router.navigate(['/home']);
      },
      (err) => {
        this.isSaving = false;
        if (err.status === 403 || err.status === 401) {
          this.toastService.changeMessage(
            {
              isError: true,
              message: err.error.mensaje,
            }
          );
        }
      }
    );
  }

  previousState(): void {
    window.history.back();
  }

  login(): void  {
    this.isSaving = true;
    this.subscribeToSaveResponse(this.auth.login(this.getUserData()))
  }

}


