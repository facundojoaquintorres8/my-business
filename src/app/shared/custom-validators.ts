import { AbstractControl, ValidationErrors } from "@angular/forms";

export function ValidarClaveRepetida(control: AbstractControl) {

  console.log('Control: ',control.value);
  console.log('parent: ', control.parent?.value.claveNueva);

  if (control.value !== control.parent?.value.claveNueva) {
    console.log('Coinciden');
    return { errorClaveNevaRepetida: true };
  }
  return null;



}
export function ValidarClave(control: AbstractControl){

  if (control.value !== control.parent?.value.claveNuevaRepetida) {
    console.log('Coinciden');
    return { errorClaveNeva: true };
  }
  return null;
}
