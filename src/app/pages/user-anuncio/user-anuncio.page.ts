import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { MovelService } from 'src/app/services/movel.service';
import { IMovel } from 'src/app/shared/model/movel.interface';
import { environment } from 'src/environments/environment';
import { NewAnnouncePage } from '../new-announce/new-announce.page';

@Component({
  selector: 'app-user-anuncio',
  templateUrl: './user-anuncio.page.html',
  styleUrls: ['./user-anuncio.page.scss'],
})
export class UserAnuncioPage {
  moveis: Array<IMovel> = [];
  apiLink = environment.imageUrl;
  constructor(
    public movelService: MovelService,
    public loadingController: LoadingController,
    public authService: AuthService,
    private modalController: ModalController,
    private alertController: AlertController
  ) { }

  ionViewWillEnter() {
    this.getMyListsItems();
  }

  async getMyListsItems() {
    await this.presentLoading();
    this.moveis = [];
    this.movelService.getUserAnuncio(this.authService.userValue.id).subscribe(moveis => {
      moveis.forEach(movel => {
        this.moveis.push(movel);
      });
      this.loadingController.dismiss('firstLoading');
    }, (error) => {
      this.moveis = [];
      this.loadingController.dismiss('firstLoading');
      console.error(error);
    });
  }
  async presentLoading() {
    const loading = await this.loadingController.create({
      id: 'firstLoading',
      cssClass: 'my-custom-class',
      message: 'Carregando...',
    });
    await loading.present();
  }
  redirectToEdit(movel) {
    this.modalVerVisitas(movel);
  }
  async modalVerVisitas(visitaInfo?) {
    const modal = await this.modalController.create({
      component: NewAnnouncePage,
      cssClass: 'my-custom-class',
      componentProps: {
        movelData: visitaInfo,
      }
    });
    return await modal.present();
  }
  async presentDeleteConfirmationAlert(id) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Atenção!',
      message: 'Realemente deseja excluir o anúncio?',
      buttons: [{
        text: 'Não',
        handler: () => {
          alert.dismiss();
        }
      }, {
        text: 'Sim',
        handler: () => {
          this.delete(id);
        }
      }]
    });
    await alert.present();
  }
  async delete(id) {
    await this.presentLoading();
    this.movelService.delete(id, this.authService.userValue.id).subscribe(async (data) => {
      this.moveis = this.moveis.filter(item => item.id !== id);
      await this.loadingController.dismiss('firstLoading');
      await this.presentSuccessAlert();
    }, error => {
      this.loadingController.dismiss('firstLoading');
      this.presentErrorAlert(error.error.data);
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
      header: 'Eba! Cadastrado com Sucesso!!',
      message: 'Bem vind@! Faça o login para começar.',
      buttons: ['OK']
    });
    await alert.present();
  }
}
