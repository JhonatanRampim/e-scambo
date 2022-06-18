import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { GalleryItem, ImageItem } from 'ng-gallery';
import { MovelService } from 'src/app/services/movel.service';
import { IMovel } from 'src/app/shared/model/movel.interface';
import { environment } from 'src/environments/environment';

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
    public router: Router,
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
    // await this.presentLoading();
    this.movelService.getMovelAnuncio(listaId).subscribe(async response => {
      this.movel = response;
      this.movel.estado = response.category.split(',');
      this.images = this.movel.foto.map(picture =>
        new ImageItem({ src: `${environment.imageUrl}${picture.path}`, thumb: `${environment.imageUrl}${picture.path}` })
      );
      // await this.loadingController.dismiss('firstLoading');
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
  loadChat(usuarioId, movelId) {
    return this.router.navigate(['/chat'], { queryParams: { usuarioId: usuarioId, movelId: movelId } });
  }
}
