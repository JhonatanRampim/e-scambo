import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from 'src/app/services/auth-guard.service';

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
        path: 'user-anuncio',
        loadChildren: () => import('../user-anuncio/user-anuncio.module').then(m => m.UserAnuncioPageModule),
      },
      {
        path: 'meus-chats',
        loadChildren: () => import('../meus-chats/meus-chats.module').then( m => m.MeusChatsPageModule)
      },
      {
        path: '',
        redirectTo: 'consulta-anuncios',
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
