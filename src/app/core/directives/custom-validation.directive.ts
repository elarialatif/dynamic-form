import { Directive, Input, HostListener, ElementRef, Renderer2 } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl, ValidationErrors, Validators } from '@angular/forms';

@Directive({
  selector: '[appCustomValidation]',
  providers: [{ provide: NG_VALIDATORS, useExisting: CustomValidationDirective, multi: true }]
})
export class CustomValidationDirective implements Validator {
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  validate(control: AbstractControl): ValidationErrors | null {
    const value = control.value;

    if (value === 'example') {
      return { customValidation: true };
    }

    return null;
  }
}
