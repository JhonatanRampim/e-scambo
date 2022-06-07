import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserAnuncioPageRoutingModule } from './user-anuncio-routing.module';

import { UserAnuncioPage } from './user-anuncio.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserAnuncioPageRoutingModule
  ],
  declarations: [UserAnuncioPage]
})
export class UserAnuncioPageModule {}
