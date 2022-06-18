import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { MovelService } from 'src/app/services/movel.service';
import { IMovel } from 'src/app/shared/model/movel.interface';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-new-announce',
  templateUrl: './new-announce.page.html',
  styleUrls: ['./new-announce.page.scss'],
})
export class NewAnnouncePage implements OnInit {
  @Input() movelData: any;
  apiLink = environment.imageUrl;
  public customPatterns = { 0: { pattern: new RegExp('\[a-zA-Z\]'), } };
  categoryList: string[] = ['Sofá', 'Cadeira', 'Banqueta', 'Cômoda', 'Mesa de Jantar', 'Mesa de Escritório ', 'Colchão', 'Cama',
    'Guarda-roupa', 'TV', 'Geladeira', 'Fogão', 'Micro-ondas', 'Poltrona', 'Guarda-Roupa', 'Armário'];
  novoMovelForm = new FormGroup({
    nome: new FormControl('', [Validators.required]),
    color: new FormControl('', []),
    width: new FormControl('', []),
    height: new FormControl('', []),
    length: new FormControl('', []),
    descricao: new FormControl('', [Validators.required]),
    estado: new FormControl('', [Validators.required]),
    foto1: new FormControl('', [Validators.required]),
    foto2: new FormControl('', [Validators.required]),
    foto3: new FormControl('', []),
    foto4: new FormControl('', []),
  });
  isSubmitted = false;
  isLoading: boolean;
  isReadOnly = false;
  movel: IMovel;
  selectedCategory;
  constructor(public formBuilder: FormBuilder,
    public movelServie: MovelService,
    public authService: AuthService,
    private modalController: ModalController,
    public alertController: AlertController,
    private router: Router,
    private loadingController: LoadingController) { }

  get f() {
    return this.novoMovelForm.controls;
  }
  ngOnInit() {
    if (this.movelData) {
      this.isReadOnly = true;
      this.novoMovelForm = new FormGroup({
        nome: new FormControl('', [Validators.required]),
        color: new FormControl('', []),
        width: new FormControl('', []),
        height: new FormControl('', []),
        length: new FormControl('', []),
        descricao: new FormControl('', [Validators.required]),
        estado: new FormControl('', [Validators.required]),
        foto1: new FormControl('', []),
        foto2: new FormControl('', []),
        foto3: new FormControl('', []),
        foto4: new FormControl('', []),
      });
      this.fillFormData(this.movelData);
    }
  }

  fillFormData(movel) {
    this.f.nome.setValue(movel.name);
    this.f.color.setValue(movel.color);
    this.f.width.setValue(movel.width);
    this.f.height.setValue(movel.height);
    this.f.length.setValue(movel.length);
    this.f.descricao.setValue(movel.description);
    this.f.estado.setValue(movel.category);
    this.selectedCategory = movel.category;
  }
  async submitEditData() {
    await this.presentLoading();
    const formData = new FormData();

    formData.append('name', this.f.nome.value);
    if (this.f.color.value) {
      formData.append('color', this.f.color.value);
    }
    if (this.f.width.value) {
      formData.append('width', this.f.width.value);
    }
    if (this.f.height.value) {
      formData.append('height', this.f.height.value);
    }
    if (this.f.length.value) {
      formData.append('length', this.f.length.value);
    }

    formData.append('description', this.f.descricao.value);
    formData.append('usuario_id', this.authService.userValue.id);
    formData.append('movel_id', this.movelData.id);
    formData.append('category', this.f.estado.value);
    if (this.f.foto1.value) {
      formData.append('foto_1', this.f.foto1.value.files[0]);
    }
    if (this.f.foto2.value) {
      formData.append('foto_2', this.f.foto2.value.files[0]);
    }
    if (this.f.foto3.value) {
      formData.append('foto_3', this.f.foto3.value.files[0]);
    };
    if (this.f.foto4.value) {
      formData.append('foto_4', this.f.foto4.value.files[0]);
    };
    this.movelServie.edit(formData).subscribe(async response => {
      if (!response.success) {
        this.isLoading = false;
        await this.loadingController.dismiss('firstLoading');
        await this.presentErrorAlert(response.data);
      }
      await this.loadingController.dismiss('firstLoading');
      await this.presentSuccessAlert();
      this.isLoading = false;
      await this.modalController.dismiss();

    }, async (error) => {
      await this.loadingController.dismiss('firstLoading');
      this.isLoading = false;
      await this.presentErrorAlert(error.error.data);
    });
  }

  async onSubmit() {
    await this.presentLoading();
    const formData = new FormData();

    formData.append('name', this.f.nome.value);
    if (this.f.color.value) {
      formData.append('color', this.f.color.value);
    }
    if (this.f.width.value) {
      formData.append('width', this.f.width.value);
    }
    if (this.f.height.value) {
      formData.append('height', this.f.height.value);
    }
    if (this.f.length.value) {
      formData.append('length', this.f.length.value);
    }

    formData.append('description', this.f.descricao.value);
    formData.append('usuario_id', this.authService.userValue.id);
    formData.append('category', this.f.estado.value);
    formData.append('foto_1', this.f.foto1.value.files[0]);
    formData.append('foto_2', this.f.foto2.value.files[0]);
    if (this.f.foto3.value) {
      formData.append('foto_3', this.f.foto3.value.files[0]);
    };
    if (this.f.foto4.value) {
      formData.append('foto_4', this.f.foto4.value.files[0]);
    };
    this.movelServie.create(formData).subscribe(async response => {
      if (!response.success) {
        this.isLoading = false;
        await this.loadingController.dismiss('firstLoading');
        await this.presentErrorAlert(response.data);
      }
      await this.loadingController.dismiss('firstLoading');
      await this.presentSuccessAlert();
      this.isLoading = false;

    }, async (error) => {
      this.isLoading = false;
      await this.loadingController.dismiss('firstLoading');
      await this.presentErrorAlert(error.error.data);
    });
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
      header: 'Cadastrado com Sucesso!',
      message: 'Agora é só aguardar alguém entrar em contato.',
      buttons: [{
        text: 'Ok',
        handler: () => {
          if (this.movelData) {
            this.closeModal();
            return this.router.navigate(['/home']);
          }
          this.router.navigate(['/home']);
        }
      }]
    });
    await alert.present();
  }
  closeModal() {
    this.modalController.dismiss();
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
