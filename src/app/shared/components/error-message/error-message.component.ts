import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-error-message',
  templateUrl: './error-message.component.html',
  standalone: true,
  imports: [CommonModule],
})
export class ErrorMessageComponent {
  @Input() control: AbstractControl | null = null;

  get isInvalid() {
    return this.control?.invalid && this.control?.touched;
  }

  get errorMessage(): string | null {
    if (this.control && this.control.errors) {
      const errors = this.control.errors;

      if (errors['required']) {
        return 'This field is required.';
      }

      if (errors['email']) {
        return 'Please enter a valid email address.';
      }

      for (const errorKey in errors) {
        if (errorKey in errors) {
          return errors[errorKey];
        }
      }
    }
    return null;
  }
}
