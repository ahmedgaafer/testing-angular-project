import {
  Component,
  input,
  contentChild,
  computed,
  effect,
  ElementRef,
  inject,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { UiFieldHelperTextComponent } from '../ui-field-helper-text/ui-field-helper-text.component';

@Component({
  selector: 'app-ui-field',
  standalone: true,
  imports: [],
  templateUrl: './ui-field.component.html',
  styleUrl: './ui-field.component.scss',
})
export class UiFieldComponent {
  // Signal inputs
  width = input<string>('200px');
  height = input<string>('60px');
  control = input<FormControl | null>(null);
  label = input<string>('');
  required = input<boolean>(false);

  // ContentChild signal to detect helper text component
  helperText = contentChild(UiFieldHelperTextComponent);

  // Element reference for applying styles
  private elementRef = inject(ElementRef<HTMLElement>);

  // Computed signals for form state
  isInvalid = computed(() => {
    const ctrl = this.control();
    return ctrl ? ctrl.invalid && ctrl.touched : false;
  });

  isTouched = computed(() => {
    const ctrl = this.control();
    return ctrl ? ctrl.touched : false;
  });

  isDirty = computed(() => {
    const ctrl = this.control();
    return ctrl ? ctrl.dirty : false;
  });

  hasError = computed(() => {
    return this.isInvalid();
  });

  // Computed signal to determine if field is required
  isRequired = computed(() => {
    const requiredInput = this.required();
    const ctrl = this.control();
    // Check if required from input or from form control validators
    if (requiredInput) return true;
    if (ctrl && ctrl.validator) {
      const validator = ctrl.validator({} as any);
      return validator && validator['required'] !== undefined;
    }
    return false;
  });

  // Computed signal to check if label should be shown
  showLabel = computed(() => {
    return this.label().length > 0;
  });

  constructor() {
    // Effect to apply CSS custom properties when dimensions change
    effect(() => {
      const width = this.width();
      const height = this.height();
      const element = this.elementRef.nativeElement;

      if (element) {
        element.style.setProperty('--field-width', width);
        element.style.setProperty('--field-height', height);
      }
    });
  }
}
