import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'punto',
    pathMatch: 'full'
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then(m => m.FolderPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
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
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'perfil',
    loadChildren: () => import('./usuario/perfil/perfil.module').then(m => m.PerfilPageModule)
  },
  {
    path: 'notainfo',
    loadChildren: () => import('./notainfo/notainfo.module').then(m => m.NotainfoPageModule)
  },
  {
    path: 'modificar',
    loadChildren: () => import('./usuario/modificarusuario/modificarusuario.module').then(m => m.ModificarusuarioPageModule)
  },
  {
    path: 'cambiarcontrasena',
    loadChildren: () => import('./usuario/cambiarcontrasena/cambiarcontrasena.module').then(m => m.CambiarcontrasenaPageModule)
  },

  {
    path: 'notainfo',
    loadChildren: () => import('./notainfo/notainfo.module').then(m => m.NotainfoPageModule)
  },
  {
    path: 'foro',
    loadChildren: () => import('./foro/lista-dudas/lista-dudas.module').then(m => m.ListaDudasPageModule)
  },
  {
    path: 'foro/duda/:id',
    loadChildren: () => import('./foro/detalle-duda/detalle-duda.module').then(m => m.DetalleDudaPageModule)
  },
  {
    path: 'punto',
    loadChildren: () => import('./punto/punto.module').then( m => m.PuntoPageModule)
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
