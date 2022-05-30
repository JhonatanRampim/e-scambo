import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewAnnouncePage } from './new-announce.page';

const routes: Routes = [
  {
    path: '',
    component: NewAnnouncePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewAnnouncePageRoutingModule {}
