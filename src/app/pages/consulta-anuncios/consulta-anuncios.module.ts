import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConsultaAnunciosPageRoutingModule } from './consulta-anuncios-routing.module';

import { ConsultaAnunciosPage } from './consulta-anuncios.page';
import { TruncatePipeModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TruncatePipeModule,
    ConsultaAnunciosPageRoutingModule
  ],
  declarations: [ConsultaAnunciosPage]
})
export class ConsultaAnunciosPageModule {}
