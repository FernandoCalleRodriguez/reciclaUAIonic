import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {EditDudaGuardService} from './shared/services/edit-duda-guard.service';
import {EditRespuestaGuardService} from './shared/services/edit-respuesta-guard.service';

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
    path: 'usuario/modificar',
    loadChildren: () => import('./usuario/modificarusuario/modificarusuario.module').then( m => m.ModificarusuarioPageModule)
  },
  {
    path: 'usuario/cambiarcontrasena',
    loadChildren: () => import('./usuario/cambiarcontrasena/cambiarcontrasena.module').then( m => m.CambiarcontrasenaPageModule)
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
    loadChildren: () => import('./foro/formulario-duda/formulario-duda.module').then(m => m.FormularioDudaPageModule),
    canActivate: [EditDudaGuardService]
  },
  {
    path: 'foro/duda/crear/:tema',
    loadChildren: () => import('./foro/formulario-duda/formulario-duda.module').then(m => m.FormularioDudaPageModule),
    canActivate: [EditDudaGuardService]
  },
  {
    path: 'foro/duda/:duda/respuesta/:respuesta/editar',
    loadChildren: () => import('./foro/editar-respuesta/editar-respuesta.module').then( m => m.EditarRespuestaPageModule),
    canActivate: [EditRespuestaGuardService]
  },
  {
    path: 'usuario/propuestas',
    loadChildren: () => import('./validacion/propuestas-usuario/propuestas-usuario.module').then( m => m.PropuestasUsuarioPageModule)
  },
  {
    path: 'material',
    loadChildren: () => import('./juego/juego/material/material.module').then(m => m.MaterialPageModule)
  },
  {
    path: 'item',
    loadChildren: () => import('./juego/juego/item/item.module').then(m => m.ItemPageModule)
  },
  {
    path: 'item/edit/:id',
    loadChildren: () => import('./juego/juego/item/item.module').then(m => m.ItemPageModule)
  },
  {
    path: 'material/edit/:id',
    loadChildren: () => import('./juego/juego/material/material.module').then(m => m.MaterialPageModule)
  },
  {
    path: 'item-list',
    loadChildren: () => import('./juego/juego/item-list/item-list.module').then(m => m.ItemListPageModule)
  },
  {
    path: 'material-list',
    loadChildren: () => import('./juego/juego/material-list/material-list.module').then(m => m.MaterialListPageModule)
  },
  {
    path: 'punto/crear/estancia/:idEstancia',
    loadChildren: () => import('./punto/punto.module').then( m => m.PuntoPageModule)
  },
  {
    path: 'punto/edit/:id',
    loadChildren: () => import('./punto/punto.module').then( m => m.PuntoPageModule)
  },
  {
    path: 'notainfodetalle/:id',
    loadChildren: () => import('./notainfodetalle/notainfodetalle.module').then( m => m.NotainfodetallePageModule)
  },
  {
    path: 'usuario/ranking',
    loadChildren: () => import('./usuario/ranking/ranking.module').then( m => m.RankingPageModule)
  },
  {
    path: 'usuario/acciones',
    loadChildren: () => import('./accion/accion.module').then( m => m.AccionPageModule)
  },
  {
    path: 'juego',
    loadChildren: () => import('./juego/juego/juego/juego.module').then(m => m.JuegoPageModule)
  },
  {
    path: 'iniciojuego',
    loadChildren: () => import('./juego/iniciojuego/iniciojuego.module').then( m => m.IniciojuegoPageModule)
  },
  {
    path: 'rankingjuego',
    loadChildren: () => import('./juego/rankingjuego/rankingjuego.module').then( m => m.RankingjuegoPageModule)
  },
  {
    path: 'punto/crear',
    loadChildren: () => import('./seleccion-estancia-punto/seleccion-estancia-punto.module').then( m => m.SeleccionEstanciaPuntoPageModule)
  },
  {
    path: 'reciclar',
    loadChildren: () => import('./accion-reciclar/accion-reciclar.module').then( m => m.AccionReciclarPageModule)
  },
  {
    path: 'donde-reciclar',
    loadChildren: () => import('./reciclaje/reciclaje.module').then( m => m.ReciclajePageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
