import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { CustomValidators } from 'src/app/helpers/CustomValidators';
import { AuthService } from 'src/app/services/auth.service';

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
    phone: new FormControl('', [Validators.required, Validators.minLength(2)]),
  }, [CustomValidators.mustMatch('password', 'confirmPassword'), CustomValidators.mustMatch('email', 'confirmEmail')]);


  constructor(public fb: FormBuilder,
    private router: Router,
    public registrarService: AuthService,
    private alertController: AlertController) { }

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
  async presentErrorAlert(message?) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Ops! Houve um erro :(',
      message,
      buttons: ['OK']
    });
    await alert.present();
  }
  async presentSuccessAlert(message?) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Eba! Cadastrado com Sucesso!!',
      message: 'Bem vind@! Faça o login para começar.',
      buttons: ['OK']
    });
    await alert.present();
  }
  submitForm() {
    this.isSubmitted = true;
    this.isLoading = true;
    if (this.signUpForm.invalid) {
      this.isLoading = false;
      return;
    }
    this.registrarService
      .signup(this.signUpForm.value)
      .subscribe(
        async (data) => {
          if (!data.success) {
            this.isLoading = false;
            this.presentErrorAlert(data.data);
          }
          await this.presentSuccessAlert();
          this.isLoading = false;
          this.router.navigate(['/login']);
        },
        (error) => {
          this.isLoading = false;
          this.presentErrorAlert(error.error.data);
        }
      );

  }


}
