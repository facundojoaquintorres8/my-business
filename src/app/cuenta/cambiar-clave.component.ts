import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { IUser, IUsuarioClave } from '../usuarios/usuarios.models';
import { CuentaService } from './cuenta.service';
import { Observable } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { ValidarClaveRepetida } from '../shared/custom-validators';
import { AuthService } from '../auth/auth.service';
import { ToastService } from '../toast/toast.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-cambiar-clave',
    templateUrl: './cambiar-clave.component.html'
})
export class CambiarClaveComponent implements OnInit {

    isSaving = false;
    usuarioClave!: IUsuarioClave;
    expresion = '^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]){8,32}$';
    user!: IUser;

    myForm = this.fb.group({
        claveVieja: [null, [Validators.required]],
        claveNueva: [null, [Validators.required, Validators.pattern('^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,32}$')]],
        claveNuevaRepetida: [null, [Validators.required, ValidarClaveRepetida]]
    });

    constructor(
        private fb: FormBuilder,
        private cuentaService: CuentaService,
        private authService: AuthService,
        private toastService: ToastService,
        private router: Router
    ) {
    }

    ngOnInit(): void {
        this.user = this.authService.getSessionUser();
    }

    clearFormInput(): void {
        this.myForm.get(['claveNuevaRepetida'])?.reset();
    }

    save(): void {
        this.isSaving = true;
        this.usuarioClave = this.getUserData();
        this.subscribeToSaveResponse(this.cuentaService.updatePassword(this.usuarioClave));
    }

    previousState(): void {
        window.history.back();
    }

    private getUserData(): IUsuarioClave {
        return {
            id: this.user.id,
            claveVieja: this.myForm.get(['claveVieja'])!.value,
            claveNueva: this.myForm.get(['claveNueva'])!.value
        };
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IUsuarioClave>>): void {
        result.subscribe(
            () => {
                this.toastService.changeMessage(
                    {
                        isSuccess: true,
                        message: 'Cambio de Clave Realizado Correctamente'
                    }
                );
                this.router.navigate(['login']);
            },
            (err) => {
                this.clearFormInput();
                this.isSaving = false;
                this.toastService.changeMessage(
                    {
                        isError: true,
                        message: err.error.msg,
                    }
                );
            }
        );
    }
}


