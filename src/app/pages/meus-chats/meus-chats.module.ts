import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MeusChatsPageRoutingModule } from './meus-chats-routing.module';

import { MeusChatsPage } from './meus-chats.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MeusChatsPageRoutingModule
  ],
  declarations: [MeusChatsPage]
})
export class MeusChatsPageModule {}
