import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonSearchbar, LoadingController } from '@ionic/angular';
import { MovelService } from 'src/app/services/movel.service';
import { IMovel } from 'src/app/shared/model/movel.interface';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-consulta-anuncios',
  templateUrl: './consulta-anuncios.page.html',
  styleUrls: ['./consulta-anuncios.page.scss'],
})
export class ConsultaAnunciosPage implements OnInit {
  @ViewChild(IonSearchbar) input: IonSearchbar;
  moveis: Array<IMovel> = [];
  showSearchBar = false;
  apiLink = environment.imageUrl;

  constructor(
    public movelService: MovelService,
    public router: Router,
    public loadingController: LoadingController
  ) { }

  ngOnInit() { }
  ionViewWillEnter() {
    this.getMyListsItems();
  }

  async getMyListsItems() {
    await this.presentLoading();
    this.moveis = [];
    this.movelService.getMoveisAnunciados().subscribe(moveis => {
      moveis.forEach(movel => {
        this.moveis.push(movel);
      });
      this.loadingController.dismiss('firstLoading');
    }, (error) => {
      this.loadingController.dismiss('firstLoading');
      console.error(error)
    });
  }
  verDetalhes(selectedId: number) {
    this.router.navigate(['/detalhe-anuncio', selectedId]);
  }
  enableSearchBar() {
    this.showSearchBar = !this.showSearchBar;
    if (this.showSearchBar === true) {
      setTimeout(() => { this.input.setFocus(); }, 150);
    }
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
