import { AbstractControl } from "@angular/forms";

export function ValidarClaveRepetida(control: AbstractControl) {
  if (control.value !== control.parent?.value.claveNueva) {
    return { errorClaveNevaRepetida: true };
  }
  return null;

}
