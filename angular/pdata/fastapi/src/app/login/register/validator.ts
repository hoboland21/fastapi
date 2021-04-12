import { FormGroup,ValidatorFn, ValidationErrors } from '@angular/forms';

// custom validator to check that two fields match
export function ConfirmedValidator(controlName: string, matchingControlName: string):ValidatorFn {
    return (form: FormGroup) : ValidationErrors | null => {
        const control = form.controls[controlName];
        const matchingControl = form.controls[matchingControlName];
        if (matchingControl.errors && !matchingControl.errors.confirmedValidator) {
            return;
        }
        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ confirmedValidator: true });
        } else {
            matchingControl.setErrors(null);
        }
    }
}

