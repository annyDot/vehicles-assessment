import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function passwordValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) return null;
    
    const password = control.value;

    const hasUpperCase = /[A-Z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const isValidLength = password.length >= 8;

    const isValidPassword =
      hasUpperCase &&
      hasNumbers &&
      hasSpecialChar &&
      isValidLength;
      
    return isValidPassword
      ? null
      : {
          passwordStrength:
            'Password must be at least 8 characters long and contain at least one uppercase letter, one number, and one special character.',
        };
  };
}
