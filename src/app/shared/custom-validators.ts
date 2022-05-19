import { AbstractControl } from '@angular/forms';

export function ValidarClaveRepetida(control: AbstractControl): any {
    if (control.value !== control.parent?.value.claveNueva) {
        return { errorClaveNevaRepetida: true };
    }
    return null;

}
