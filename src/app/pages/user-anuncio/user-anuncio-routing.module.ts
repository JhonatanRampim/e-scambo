import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserAnuncioPage } from './user-anuncio.page';

const routes: Routes = [
  {
    path: '',
    component: UserAnuncioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserAnuncioPageRoutingModule {}
