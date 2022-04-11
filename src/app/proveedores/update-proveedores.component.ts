import {Component, OnInit} from '@angular/core';
import {HttpResponse} from '@angular/common/http';
import {FormBuilder, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';
import {ProveedorService} from './proveedores.service';
import {IProveedor} from './proveedores.models';
import {ToastService} from '../toast/toast.service'

@Component({
    selector: 'app-update-proveedores',
    templateUrl: './update-proveedores.component.html'
})
export class UpdateProveedorComponent implements OnInit {
    isSaving = false;

    myForm = this.fb.group({
        id: [],
        razonSocial: [null, [Validators.required]],
        cuitDni: [null, [Validators.required, Validators.minLength(8), Validators.maxLength(11)]],
        telefono: [null],
        email: [null],
        direccion: [null],
        activo: [null],
    });

    constructor(
        private proveedorService: ProveedorService,
        private activatedRoute: ActivatedRoute,
        private fb: FormBuilder,
        private toastService: ToastService
    ) {};

    ngOnInit(): void {
        const id = this.activatedRoute.snapshot.paramMap.get('id');
        if (id) {
            this.proveedorService.find(parseInt(id, 10)).subscribe(
                (res: HttpResponse<IProveedor>) => this.updateForm(res.body!)
            );
        }
    }

    updateForm(proveedor: IProveedor): void {
        this.myForm.patchValue({
            id: proveedor.id,
            razonSocial: proveedor.razonSocial,
            cuitDni: proveedor.cuitDni,
            telefono: proveedor.telefono,
            email: proveedor.email,
            direccion: proveedor.direccion,
            activo: proveedor.activo,
        });
    }

    previousState(): void {
        window.history.back();
    }

    save(): void {
        this.isSaving = true;
        const proveedor = this.createFromForm();
        if (proveedor.id) {
            this.subscribeToSaveResponse(this.proveedorService.update(proveedor));
        } else {
            this.subscribeToSaveResponse(this.proveedorService.create(proveedor));
        }
    }

    private createFromForm(): IProveedor {
        return {
            id: this.myForm.get(['id'])!.value,
            razonSocial: this.myForm.get(['razonSocial'])!.value,
            cuitDni: this.myForm.get(['cuitDni'])!.value.trim(),
            telefono: this.myForm.get(['telefono'])!.value,
            email: this.myForm.get(['email'])!.value,
            direccion: this.myForm.get(['direccion'])!.value,
            activo: this.myForm.get(['activo'])!.value,
        };

    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IProveedor>>): void {
        result.subscribe(
            () => this.previousState(),
            (error) => {
                this.isSaving = false
                this.toastService.changeMessage({
                    isError: true,
                    message: 'El CUIT / DNI ingresado ya existe',
                }
                );
            }
        );
    }
}
