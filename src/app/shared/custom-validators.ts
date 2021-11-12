import { AbstractControl, ValidationErrors } from "@angular/forms";

export function ValidateUrl(control: AbstractControl) {

  console.log('Control: ',control.value);
  console.log('parent: ', control.parent?.value.claveNueva);

  if (control.value !== control.parent?.value.claveNueva) {
    console.log('Coinciden');
    return { validUrl: true };
  }
  return null;



}
