import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './services/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'new',
    loadChildren: () => import('./pages/new-announce/new-announce.module').then( m => m.NewAnnouncePageModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'consulta-anuncios',
    loadChildren: () => import('./pages/consulta-anuncios/consulta-anuncios.module').then( m => m.ConsultaAnunciosPageModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'detalhe-anuncio/:id',
    loadChildren: () => import('./pages/detalhe-anuncio/detalhe-anuncio.module').then( m => m.DetalheAnuncioPageModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'registrar',
    loadChildren: () => import('./pages/registrar/registrar.module').then( m => m.RegistrarPageModule)
  },
  {
    path: 'chat',
    loadChildren: () => import('./pages/chat/chat.module').then( m => m.ChatPageModule)
  },


];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  providers: [AuthGuardService],
  exports: [RouterModule]
})
export class AppRoutingModule {}
