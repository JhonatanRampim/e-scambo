import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetalheAnuncioPageRoutingModule } from './detalhe-anuncio-routing.module';

import { DetalheAnuncioPage } from './detalhe-anuncio.page';

import { GalleryModule, GALLERY_CONFIG } from 'ng-gallery';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GalleryModule,
    DetalheAnuncioPageRoutingModule
  ],
  providers: [
    {
      provide: GALLERY_CONFIG,
      useValue: {
        dots: true,
        imageSize: 'cover'
      }
    }
  ],
  declarations: [DetalheAnuncioPage]
})
export class DetalheAnuncioPageModule {}
