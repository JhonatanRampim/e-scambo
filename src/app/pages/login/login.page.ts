import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController, MenuController } from '@ionic/angular';
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

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private menuControler: MenuController,
    private alertController: AlertController,
    private loadingController: LoadingController,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      login: ['', [Validators.required, Validators.minLength(2), Validators.email]],
      pass: ['', [Validators.required, Validators.minLength(2)]],
    });
  }

  ionViewDidEnter(): void {
    this.loadingController.dismiss();
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
  async submitForm() {
    this.isSubmitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    await this.presentLoading();
    this.authService
      .login(this.loginForm.value)
      .subscribe(
        async (data) => {
          if (!data.success) {
            this.isLoading = false;
            return this.presentAlert(data.data);
          }
          await this.loadingController.dismiss('firstLoading');
          this.isLoading = false;
          this.router.navigate(['/home']);
        },
        async (error) => {
          await this.loadingController.dismiss('firstLoading');
          this.isLoading = false;
          await this.presentAlert(error.error?.data);
        }
      );
  }
  async presentLoading() {
    const loading = await this.loadingController.create({
      id: 'firstLoading',
      cssClass: 'my-custom-class',
      message: 'Carregando...',
    });
    await loading.present();
  }

}
