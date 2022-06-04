import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'new',
    loadChildren: () => import('./pages/new-announce/new-announce.module').then( m => m.NewAnnouncePageModule)
  },
  {
    path: 'consulta-anuncios',
    loadChildren: () => import('./pages/consulta-anuncios/consulta-anuncios.module').then( m => m.ConsultaAnunciosPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'detalhe-anuncio/:id', loadChildren: () => import('./pages/detalhe-anuncio/detalhe-anuncio.module').then( m => m.DetalheAnuncioPageModule)
  }



];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
