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
    loadChildren: () => import('./usuario/registro/registro.module').then( m => m.RegistroPageModule)
  },
  {
    path: 'recuperarcontrasena',
    loadChildren: () => import('./usuario/recuperarcontrasena/recuperarcontrasena.module').then( m => m.RecuperarcontrasenaPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'perfil',
    loadChildren: () => import('./usuario/perfil/perfil.module').then( m => m.PerfilPageModule)
  },
  {
    path: 'notainfo',
    loadChildren: () => import('./notainfo/notainfo.module').then( m => m.NotainfoPageModule)
  },
  {
    path: 'foro',
    loadChildren: () => import('./foro/lista-dudas/lista-dudas.module').then( m => m.ListaDudasPageModule)
  },
  {
    path: 'foro/duda/:id',
    loadChildren: () => import('./foro/detalle-duda/detalle-duda.module').then( m => m.DetalleDudaPageModule)
  },
  {
    path: 'foro/duda/:id/editar',
    loadChildren: () => import('./foro/formulario-duda/formulario-duda.module').then(m => m.FormularioDudaPageModule)
  },
  {
    path: 'foro/duda/crear/:tema',
    loadChildren: () => import('./foro/formulario-duda/formulario-duda.module').then(m => m.FormularioDudaPageModule)
  },
  {
    path: 'foro/duda/:duda/respuesta/:respuesta/editar',
    loadChildren: () => import('./foro/editar-respuesta/editar-respuesta.module').then( m => m.EditarRespuestaPageModule)
  },
  {
    path: 'propuestas',
    loadChildren: () => import('./validacion/propuestas-usuario/propuestas-usuario.module').then( m => m.PropuestasUsuarioPageModule)
  },
  {
    path: 'material',
    loadChildren: () => import('./juego/material/material.module').then( m => m.MaterialPageModule)
  },
  {
    path: 'item',
    loadChildren: () => import('./juego/item/item.module').then( m => m.ItemPageModule)
  },
  {
    path: 'item-list',
    loadChildren: () => import('./juego/item-list/item-list.module').then( m => m.ItemListPageModule)
  },
  {
    path: 'material-list',
    loadChildren: () => import('./juego/material-list/material-list.module').then( m => m.MaterialListPageModule)
  },
  {
    path: 'punto',
    loadChildren: () => import('./punto/punto.module').then( m => m.PuntoPageModule)
  },
  {
    path: 'notainfodetalle/:id',
    loadChildren: () => import('./notainfodetalle/notainfodetalle.module').then( m => m.NotainfodetallePageModule)
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
