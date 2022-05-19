import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IQuickCliente } from './clientes.models';

@Component({
    templateUrl: './add-quick-clientes-modal.component.html'
})
export class AddQuickClienteModalComponent {

    myForm = this.fb.group({
        dni: [null, [Validators.required]],
        apellido: [null, [Validators.required]],
        nombre: [null, [Validators.required]],
        tipo: [null, [Validators.required]],
        telefono: [null, []],
    });

    constructor(private fb: FormBuilder, private activeModal: NgbActiveModal) {
    }

    cancel(): void {
        this.activeModal.dismiss();
    }

    save(): void {
        this.activeModal.close(this.createFromForm());
    }

    private createFromForm(): IQuickCliente {
        return {
            dni: this.myForm.get(['dni'])!.value,
            apellido: this.myForm.get(['email'])!.value,
            nombre: this.myForm.get(['nombre'])!.value,
            tipo: this.myForm.get(['tipo'])!.value,
            telefono: this.myForm.get(['telefono'])!.value,
        };
    }

}

