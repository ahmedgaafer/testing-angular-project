import { Component, signal, computed } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { UiFieldComponent } from '../../components/ui-field/ui-field.component';
import { UiFieldHelperTextComponent } from '../../components/ui-field-helper-text/ui-field-helper-text.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-showcase-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    UiFieldComponent,
    UiFieldHelperTextComponent,
  ],
  templateUrl: './showcase-form.component.html',
  styleUrl: './showcase-form.component.scss',
})
export class ShowcaseFormComponent {
  private fb = new FormBuilder();

  // Form group
  form = this.fb.group({
    // Row 1
    firstName: ['', [Validators.required, Validators.minLength(2)]],
    lastName: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],

    // Row 2
    phone: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
    age: ['', [Validators.required, Validators.min(18), Validators.max(120)]],
    website: ['', [Validators.pattern(/^https?:\/\/.+/)]],

    // Row 3
    password: ['', [Validators.required, Validators.minLength(8)]],
    confirmPassword: ['', [Validators.required]],
    country: ['', Validators.required],

    // Row 4
    city: ['', Validators.required],
    zipCode: ['', [Validators.required, Validators.pattern(/^[0-9]{5}$/)]],
    address: ['', [Validators.required, Validators.minLength(10)]],

    // Row 5
    company: ['', Validators.required],
    jobTitle: ['', Validators.required],
    salary: ['', [Validators.required, Validators.min(0)]],

    // Row 6
    startDate: ['', Validators.required],
    endDate: ['', Validators.required],
    notes: ['', [Validators.maxLength(100)]],

    // Row 7
    skill1: ['', Validators.required],
    skill2: ['', Validators.required],
    skill3: ['', Validators.required],

    // Row 8
    language1: ['', Validators.required],
    language2: ['', Validators.required],
    language3: ['', Validators.required],

    // Row 9
    project1: ['', Validators.required],
    project2: ['', Validators.required],
    project3: ['', Validators.required],

    // Row 10
    reference1: ['', Validators.required],
    reference2: ['', Validators.required],
    reference3: ['', Validators.required],

    // Row 11
    education: ['', Validators.required],
    certification: ['', Validators.required],
    experience: ['', [Validators.required, Validators.min(0)]],

    // Row 12
    bio: ['', [Validators.required, Validators.minLength(50)]],
    linkedin: ['', Validators.pattern(/^https?:\/\/.+/)],
    github: ['', Validators.pattern(/^https?:\/\/.+/)],
  });

  // Helper function to get form control
  getControl(name: string): FormControl {
    return this.form.get(name) as FormControl;
  }

  // Helper function to get error message
  getErrorMessage(control: FormControl, fieldName: string): string {
    if (!control.errors || !control.touched) {
      return '';
    }

    // Long error messages for at least 40% of fields (15+ fields)
    const longErrorFields = [
      'firstName',
      'lastName',
      'email',
      'phone',
      'age',
      'password',
      'confirmPassword',
      'country',
      'city',
      'zipCode',
      'address',
      'company',
      'jobTitle',
      'salary',
      'startDate',
      'endDate',
    ];

    const isLongErrorField = longErrorFields.includes(fieldName);

    if (control.errors['required']) {
      return isLongErrorField
        ? 'This field is required and must be filled out completely. Please ensure all mandatory information is provided before submitting the form.'
        : 'This field is required';
    }
    if (control.errors['email']) {
      return isLongErrorField
        ? 'Please enter a valid email address in the format: username@domain.com. The email must contain an @ symbol and a valid domain name with at least one dot.'
        : 'Please enter a valid email address';
    }
    if (control.errors['minlength']) {
      const requiredLength = control.errors['minlength'].requiredLength;
      return isLongErrorField
        ? `This field requires a minimum of ${requiredLength} characters. Your current input is too short. Please provide more detailed information to meet the minimum length requirement.`
        : `Minimum length is ${requiredLength} characters`;
    }
    if (control.errors['maxlength']) {
      const requiredLength = control.errors['maxlength'].requiredLength;
      return isLongErrorField
        ? `This field has a maximum length of ${requiredLength} characters. Your current input exceeds this limit. Please shorten your text to comply with the maximum character count.`
        : `Maximum length is ${requiredLength} characters`;
    }
    if (control.errors['min']) {
      const minValue = control.errors['min'].min;
      return isLongErrorField
        ? `The minimum allowed value for this field is ${minValue}. Please enter a value that is equal to or greater than this minimum requirement.`
        : `Minimum value is ${minValue}`;
    }
    if (control.errors['max']) {
      const maxValue = control.errors['max'].max;
      return isLongErrorField
        ? `The maximum allowed value for this field is ${maxValue}. Please enter a value that is equal to or less than this maximum limit.`
        : `Maximum value is ${maxValue}`;
    }
    if (control.errors['pattern']) {
      return isLongErrorField
        ? 'Please enter a valid format that matches the required pattern. The input you provided does not conform to the expected format for this field.'
        : 'Please enter a valid format';
    }
    return isLongErrorField
      ? 'The value you entered is invalid. Please review the field requirements and enter a valid value that meets all specified criteria.'
      : 'Invalid value';
  }

  // Helper function to get hint text
  getHintText(fieldName: string): string {
    const hints: Record<string, string> = {
      // Fields with no hint text
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      age: '',
      website: '',
      password: '',
      confirmPassword: '',
      country: '',
      city: '',
      zipCode: '',
      address: '',
      company: '',
      jobTitle: '',
      salary: '',
      startDate: '',
      endDate: '',
      notes: '',
      skill1:
        'This is a long hint text for the skill1 field. It should be at least 100 characters long to demonstrate the tooltip functionality.',
      skill2: 'short hint text for the skill2 field',
      skill3: '',
      language1: '',
      language2: '',
      language3: '',
      project1: '',
      project2: '',
      project3: '',
      reference1: '',
      reference2: '',
      reference3: '',
      education: '',
      certification: '',
      experience: '',
      bio: '',
      linkedin: '',
      github: '',
    };
    return hints[fieldName] || '';
  }

  onSubmit() {
    if (this.form.valid) {
      console.log('Form submitted:', this.form.value);
    } else {
      console.log('Form is invalid');
      this.form.markAllAsTouched();
    }
  }
}
