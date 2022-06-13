import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { MovelService } from 'src/app/services/movel.service';
import { IMovel } from 'src/app/shared/model/movel.interface';
import { environment } from 'src/environments/environment';

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
  ) { }

  ionViewWillEnter() {
    this.getMyListsItems();
  }

  async getMyListsItems() {
    await this.presentLoading();
    this.moveis = [];
    this.movelService.getUserAnuncio(this.authService.userValue.id).subscribe(moveis => {
      console.log(moveis);
      moveis.forEach(movel => {
        this.moveis.push(movel);
      });
      this.loadingController.dismiss('firstLoading');
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



}
