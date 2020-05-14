import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'registro',
    loadChildren: () => import('./usuario/registro/registro.module').then(m => m.RegistroPageModule)
  },
  {
    path: 'recuperarcontrasena',
    loadChildren: () => import('./usuario/recuperarcontrasena/recuperarcontrasena.module').then(m => m.RecuperarcontrasenaPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'perfil',
    loadChildren: () => import('./usuario/perfil/perfil.module').then(m => m.PerfilPageModule)
  },
  {
    path: 'notainfo',
    loadChildren: () => import('./notainfo/notainfo.module').then( m => m.NotainfoPageModule)
  },
  {
    path: 'modificar',
    loadChildren: () => import('./usuario/modificarusuario/modificarusuario.module').then( m => m.ModificarusuarioPageModule)
  },  {
    path: 'cambiarcontrasena',
    loadChildren: () => import('./usuario/cambiarcontrasena/cambiarcontrasena.module').then( m => m.CambiarcontrasenaPageModule)
  }


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
