import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements AfterViewInit {
  @ViewChild('form') form!: NgForm;

  ngAfterViewInit(): void {
    const savedLogin = window.localStorage.getItem('saved-login-form');
    if (savedLogin) {
      const savedEmail = JSON.parse(savedLogin).email;
      setTimeout(() => {
        // this.form.setValue({ email: savedEmail, password: '' });
        this.form.controls['email'].setValue(savedEmail);
      }, 1);
    }

    this.form.valueChanges?.pipe(debounceTime(1000)).subscribe({
      next: (value) => {
        window.localStorage.setItem(
          'saved-login-form',
          JSON.stringify({ email: value.email })
        );
      },
    });
  }

  onSubmit(formData: NgForm) {
    if (formData.form.invalid) return;

    console.log(formData.form.value);
    const enteredEmail = formData.form.controls['email'].value;
    const enteredPassword = formData.form.controls['password'].value;
    console.log(enteredEmail, enteredPassword);
    formData.form.reset();
  }
}
