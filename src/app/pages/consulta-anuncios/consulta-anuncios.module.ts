import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConsultaAnunciosPageRoutingModule } from './consulta-anuncios-routing.module';

import { ConsultaAnunciosPage } from './consulta-anuncios.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConsultaAnunciosPageRoutingModule
  ],
  declarations: [ConsultaAnunciosPage]
})
export class ConsultaAnunciosPageModule {}
