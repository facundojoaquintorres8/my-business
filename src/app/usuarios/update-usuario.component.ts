import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IUser, IUsuario } from './usuarios.models';
import { UsuariosService } from './usuarios.service';
import { Roles } from '../util/rolesUsuarios';
import { ToastService } from '../toast/toast.service';

@Component({
    selector: 'app-update-usuario',
    templateUrl: './update-usuario.component.html'
})
export class UpdateUsuarioComponent implements OnInit {

    isSaving = false;
    isUpdate = false;
    show = false;
    idd = 0;
    value = '';
    roles = Roles;
    myForm = this.fb.group({
        id: [],
        usuario: [null, [Validators.required]],
        clave: [null, [Validators.required, Validators.pattern('^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[*.!@$%^&(){}:;<>,.?/~_+-\]).{8,32}$')]],
        rol: [null, [Validators.required]],
        activo: []
    });

    constructor(
        private usuarioService: UsuariosService,
        private activatedRoute: ActivatedRoute,
        private fb: FormBuilder,
        private router: Router,
        private toastService: ToastService
    ) {
    }

    ngOnInit(): void {
        const id = this.activatedRoute.snapshot.paramMap.get('id');
        if (id) {
            this.usuarioService.find(parseInt(id, 10)).subscribe(
                (res: HttpResponse<IUser>) => {
                    this.updateForm(res.body!);
                    this.isUpdate = true;
                    let control = this.myForm.get(['clave']);
                    control?.disabled ? control?.enable() : control?.disable();
                    this.value = res.body!.rol;
                }
            );
        }
    }

    cambiarClave(id: number): void {
        this.router.navigate([`/${id}`]);
    }

    updateForm(usuario: IUser): void {
        this.myForm.patchValue({
            id: usuario.id,
            usuario: usuario.usuario,
            rol: usuario.rol,
            activo: usuario.activo
        });
    }

    previousState(): void {
        window.history.back();
    }

    save(): void {
        this.isSaving = true;
        const usuario = this.createFromForm();
        if (usuario.id) {
            this.subscribeToSaveResponse(this.usuarioService.update(usuario));
        } else {
            this.subscribeToSaveResponse(this.usuarioService.create(usuario));
        }
    }

    private createFromForm(): IUsuario {
        return {
            id: this.myForm.get(['id'])!.value,
            usuario: this.myForm.get(['usuario'])!.value,
            clave: this.myForm.get(['clave'])!.value,
            rol: this.myForm.get(['rol'])!.value,
            activo: this.myForm.get(['activo'])!.value
        };
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IUsuario>>): void {
        result.subscribe(
            () => this.previousState(),
            (error) => {
                this.isSaving = false;
                if (error.error.name === 'SequelizeUniqueConstraintError') {
                    this.toastService.changeMessage(
                        {
                            isError: true,
                            message: 'El nombre de usuario ya existe.',
                        }
                    );
                }
            }
        );
    }

}
