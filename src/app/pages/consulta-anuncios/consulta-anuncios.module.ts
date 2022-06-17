import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConsultaAnunciosPageRoutingModule } from './consulta-anuncios-routing.module';

import { ConsultaAnunciosPage } from './consulta-anuncios.page';
import { TruncatePipeModule } from 'src/app/shared/shared.module';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TruncatePipeModule,
    MatSelectModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    ConsultaAnunciosPageRoutingModule
  ],
  declarations: [ConsultaAnunciosPage]
})
export class ConsultaAnunciosPageModule {}
