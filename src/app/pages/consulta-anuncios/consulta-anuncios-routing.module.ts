import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConsultaAnunciosPage } from './consulta-anuncios.page';

const routes: Routes = [
  {
    path: '',
    component: ConsultaAnunciosPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConsultaAnunciosPageRoutingModule {}
