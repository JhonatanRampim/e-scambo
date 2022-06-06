import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.movel = this.movelService.getMovelAnuncio(Number(this.route.snapshot.paramMap.get('id')))
    this.movel.thumbnail.forEach((picture) => {
      this.images.push(new ImageItem({ src: picture.path, thumb: picture.path }),);
    });
  }

}
