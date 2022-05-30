import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewAnnouncePageRoutingModule } from './new-announce-routing.module';

import { NewAnnouncePage } from './new-announce.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewAnnouncePageRoutingModule
  ],
  declarations: [NewAnnouncePage]
})
export class NewAnnouncePageModule {}
