import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConsultaAnunciosPage } from '../consulta-anuncios/consulta-anuncios.page';

import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children: [
      {
        path: 'consulta-anuncios',
        loadChildren: () => import('../consulta-anuncios/consulta-anuncios.module').then(m => m.ConsultaAnunciosPageModule),
      },
      {
        path: '',
        redirectTo: '/consulta-anuncios',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule { }
