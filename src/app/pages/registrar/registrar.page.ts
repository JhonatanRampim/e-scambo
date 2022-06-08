import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomValidators } from 'src/app/helpers/CustomValidators';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.page.html',
  styleUrls: ['./registrar.page.scss'],
})
export class RegistrarPage implements OnInit {
  passwordType = 'password';
  passwordIcon = 'visibility';
  isSubmitted = false;
  isLoading: boolean;
  route: Router;
  signUpForm = new FormGroup({
    nome: new FormControl('', [Validators.required, Validators.minLength(2)]),
    email: new FormControl('', [Validators.required, Validators.minLength(2), Validators.email]),
    confirmEmail: new FormControl('', [Validators.required, Validators.minLength(2)]),
    password: new FormControl('', [Validators.required, Validators.minLength(2)]),
    confirmPassword: new FormControl('', [Validators.required, Validators.minLength(2)]),
  }, [CustomValidators.mustMatch('password', 'confirmPassword'), CustomValidators.mustMatch('email', 'confirmEmail')]);

  constructor(public fb: FormBuilder,
    private router: Router) { }

  get f() {
    return this.signUpForm.controls;
  }

  ngOnInit() {

  }

  hideShowPassword() {
    this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
    this.passwordIcon = this.passwordIcon === 'visibility' ? 'visibility_off' : 'visibility';
  }
  enterSubmit($event) {
    if ($event.keyCode === 13) {
      this.submitForm();
    }
  }
  submitForm() {
    this.isSubmitted = true;
    if(this.signUpForm.invalid) {
      return;
    }
    console.log(this.signUpForm.value);
  }


}
