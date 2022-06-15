import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, MenuController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

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
    public menuControler: MenuController,
    public alertController: AlertController,
    public authService: AuthService
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      login: ['', [Validators.required, Validators.minLength(2), Validators.email]],
      pass: ['', [Validators.required, Validators.minLength(2)]],
    });
  }

  ionViewDidEnter(): void {
    this.menuControler.enable(false);
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
  async presentAlert(message?) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Ops! Houve um erro :(',
      message,
      buttons: ['OK']
    });
    await alert.present();
  }
  submitForm() {
    this.isSubmitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.authService
      .login(this.loginForm.value)
      .subscribe(
        (data) => {
          if (!data.success) {
            this.isLoading = false;
            return this.presentAlert(data.data);
          }
          this.isLoading = false;
          this.router.navigate(['/home']);
        },
        (error) => {
          this.isLoading = false;
          this.presentAlert(error.error?.data);
        }
      );

  }

}
