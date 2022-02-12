import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IQuickProveedor } from './proveedores.models';

@Component({
  templateUrl: './add-quick-proveedores-modal.component.html'
})
export class AddQuickProveedorModalComponent {

  myForm = this.fb.group({
    razonSocial: [null, [Validators.required]],
    cuitDni: [null, [Validators.required]],
    telefono: [null, []],
    email: [null, []],
  });

  constructor(private fb: FormBuilder, private activeModal: NgbActiveModal) { }

  cancel(): void {
    this.activeModal.dismiss();
  }

  save(): void {
    this.activeModal.close(this.createFromForm());
  }

  private createFromForm(): IQuickProveedor {
    return {
      razonSocial: this.myForm.get(['razonSocial'])!.value,
      cuitDni: this.myForm.get(['cuitDni'])!.value,
      telefono: this.myForm.get(['telefono'])!.value,
      email: this.myForm.get(['email'])!.value,
    };
  }

}

