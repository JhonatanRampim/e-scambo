import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MeusChatsPage } from './meus-chats.page';

const routes: Routes = [
  {
    path: '',
    component: MeusChatsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MeusChatsPageRoutingModule {}
