import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ErrorMessageComponent } from './error-message.component';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common';

describe('ErrorMessageComponent', () => {
  let fixture: ComponentFixture<ErrorMessageComponent>;
  let component: ErrorMessageComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [],
      imports: [ErrorMessageComponent, CommonModule, ReactiveFormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(ErrorMessageComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should return true when control is invalid and touched', () => {
    const control = new FormControl('', { validators: [] });
    control.markAsTouched();
    control.setErrors({ required: true });

    component.control = control;
    fixture.detectChanges();

    expect(component.isInvalid).toBe(true);
  });

  it('should return error message for required', () => {
    const control = new FormControl('');
    control.setErrors({ required: true });

    component.control = control;
    fixture.detectChanges();

    expect(component.errorMessage).toBe('This field is required.');
  });

  it('should return error message for email', () => {
    const control = new FormControl('invalidEmailTest');
    control.setErrors({ email: true });

    component.control = control;
    fixture.detectChanges();

    expect(component.errorMessage).toBe('Please enter a valid email address.');
  });

  it('should return first custom error message', () => {
    const control = new FormControl('');
    control.setErrors({ customError: 'Some custom error' });

    component.control = control;
    fixture.detectChanges();

    expect(component.errorMessage).toBe('Some custom error');
  });

  it('should return null if no errors exist', () => {
    const control = new FormControl('');
    component.control = control;
    fixture.detectChanges();

    expect(component.errorMessage).toBeNull();
  });
});
