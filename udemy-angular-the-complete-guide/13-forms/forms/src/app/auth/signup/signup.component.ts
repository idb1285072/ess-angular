import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

// function equalValue(control: AbstractControl) {
//   const password = control.get('password')?.value;
//   const confirmPassword = control.get('confirmPassword')?.value;
//   if (password === confirmPassword) {
//     return null;
//   }
//   return { notEqual: true };
// }
function equalValue(controlName1:string, controlName2:string){
  return (control: AbstractControl) => {
  const value1 = control.get(controlName1)?.value;
  const value2 = control.get(controlName2)?.value;
  if (value1 === value2) {
    return null;
  }
  return { notEqual: true };
}}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  form = new FormGroup({
    email: new FormControl('', {
      validators: [Validators.email, Validators.required],
    }),
    passwords: new FormGroup({
      password: new FormControl('', {
        validators: [Validators.required, Validators.minLength(6)],
      }),
      confirmPassword: new FormControl('', {
        validators: [Validators.required, Validators.minLength(6)],
      }),
    }, {
      validators:[equalValue('password', 'confirmPassword')]
    }),

    firstName: new FormControl('', {
      validators: [Validators.required],
    }),
    lastName: new FormControl('', {
      validators: [Validators.required],
    }),

    address: new FormGroup({
      street: new FormControl('', {
        validators: Validators.required,
      }),
      number: new FormControl('', {
        validators: [Validators.required],
      }),
      postalCode: new FormControl('', {
        validators: [Validators.required],
      }),
      city: new FormControl('', {
        validators: [Validators.required],
      }),
    }),

    role: new FormControl<
      'student' | 'teacher' | 'employee' | 'founder' | 'other'
    >('student'),
    source: new FormArray([
      new FormControl(false),
      new FormControl(false),
      new FormControl(false),
    ]),
    agree: new FormControl(false, {
      validators: [Validators.required],
    }),
  });
  onSubmit() {
    if (this.form.invalid) {
      console.log('Invalid');
      return;
    }
    console.log(this.form.value);
    this.form.reset();
  }
}
