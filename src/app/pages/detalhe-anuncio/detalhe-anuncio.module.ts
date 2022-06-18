import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetalheAnuncioPageRoutingModule } from './detalhe-anuncio-routing.module';

import { DetalheAnuncioPage } from './detalhe-anuncio.page';

import { GalleryModule, GALLERY_CONFIG } from 'ng-gallery';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GalleryModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
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
