import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  passwordType = 'password';
  passwordIcon = 'visibility';
  loginForm: FormGroup;
  isSubmitted = false;
  isLoading: boolean;
  route: Router;

  constructor(public formBuilder: FormBuilder,
    private router: Router,
    public menuControler: MenuController) { }

  ngOnInit() {
    this.menuControler.enable(false);
    this.loginForm = this.formBuilder.group({
      login: ['', [Validators.required, Validators.minLength(2)]],
      pass: ['', [Validators.required, Validators.minLength(2)]],
    });
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
    console.log(this.loginForm.value.login);
    console.log(this.loginForm.value.pass);
  }

}
