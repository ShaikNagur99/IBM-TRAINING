import { AbstractControl, ValidationErrors } from '@angular/forms';

export function sameAccountValidator(control: AbstractControl): ValidationErrors | null {
  if (control.value === '123456789') {
    return {
      sameAccount: true,
    };
  }

  return null;
}
