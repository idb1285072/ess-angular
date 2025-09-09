import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { debounceTime, of } from 'rxjs';

function mustContainQuestionMark(control: AbstractControl) {
  const value = control.value;
  if (typeof value === 'string' && value.includes('?')) {
    return null;
  }
  return { doesnotContainQuestionMark: true };
}

function isUniqueEmail(control: AbstractControl) {
  if (control.value !== 'test@example.com') return of(null);
  return of({ notUnique: true });
}

let savedEmail:string;
const savedForm = window.localStorage.getItem('saved-login-form');
if(savedForm){
  savedEmail = JSON.parse(savedForm).email;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  ngOnInit(): void {
    // this.form.controls.email
    // const savedForm = window.localStorage.getItem('saved-login-form');
    // if (savedForm) {
    //   const savedEmail = JSON.parse(savedForm).email;
    //   this.form.patchValue({ email: savedEmail });
    // }

    this.form.valueChanges.pipe(debounceTime(1000)).subscribe({
      next: (value) => {
        window.localStorage.setItem(
          'saved-login-form',
          JSON.stringify({ email: value.email })
        );
      },
    });
  }
  form = new FormGroup({
    email: new FormControl(savedEmail, {
      validators: [Validators.required, Validators.email],
      asyncValidators: [isUniqueEmail],
    }),
    password: new FormControl('', {
      validators: [
        Validators.required,
        Validators.minLength(6),
        mustContainQuestionMark,
      ],
    }),
  });

  onSubmit() {
    if (this.form.invalid) return;

    console.log(this.form.value);
    const enteredEmail = this.form.value.email;
    const enteredPassword = this.form.controls['password'].value;
    console.log(enteredEmail, enteredPassword);
    this.form.reset();
  }

  get isInvalidEmail() {
    return (
      this.form.controls.email.touched &&
      this.form.controls.email.dirty &&
      this.form.controls.email.invalid
    );
  }
  get isInvalidPassword() {
    return (
      this.form.controls.password.touched &&
      this.form.controls.password.dirty &&
      this.form.controls.password.invalid
    );
  }
}
