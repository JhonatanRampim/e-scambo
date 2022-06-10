import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { GalleryItem, ImageItem } from 'ng-gallery';
import { MovelService } from 'src/app/services/movel.service';
import { IMovel } from 'src/app/shared/model/movel.interface';

@Component({
  selector: 'app-detalhe-anuncio',
  templateUrl: './detalhe-anuncio.page.html',
  styleUrls: ['./detalhe-anuncio.page.scss'],
})
export class DetalheAnuncioPage implements OnInit {
  movel: IMovel;
  images: GalleryItem[] = [];
  constructor(
    public movelService: MovelService,
    public activatedRoute: ActivatedRoute,
    private loadingController: LoadingController,
  ) { }

  ionViewWillEnter() {
    this.activatedRoute.params.subscribe(routeParams => {
      this.getMyListsItems(routeParams.id);
      this.movelService.getMovelAnuncio(routeParams.id).toPromise();
      return routeParams;
    });
  }
  ngOnInit() { }
  async getMyListsItems(listaId) {
    await this.presentLoading();
    this.movelService.getMovelAnuncio(listaId).subscribe(response => {
      this.movel = response;
      this.movel.foto.forEach((picture) => {
        this.images.push(new ImageItem({ src: picture.path, thumb: picture.path }),);
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
