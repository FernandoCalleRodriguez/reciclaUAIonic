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
    path: 'usuario/editar',
    loadChildren: () => import('./usuario/modificarusuario/modificarusuario.module').then( m => m.ModificarusuarioPageModule)
  },
  {
    path: 'usuario/editar/contrasena',
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
    path: 'notas',
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
    path: 'material/crear',
    loadChildren: () => import('./juego/material/material.module').then(m => m.MaterialPageModule)
  },
  {
    path: 'item/crear',
    loadChildren: () => import('./juego/item/item.module').then(m => m.ItemPageModule)
  },
  {
    path: 'item/:id/editar',
    loadChildren: () => import('./juego/item/item.module').then(m => m.ItemPageModule)
  },
  {
    path: 'material/:id/editar',
    loadChildren: () => import('./juego/material/material.module').then(m => m.MaterialPageModule)
  },
  {
    path: 'items',
    loadChildren: () => import('./juego/item-list/item-list.module').then(m => m.ItemListPageModule)
  },
  {
    path: 'materiales',
    loadChildren: () => import('./juego/material-list/material-list.module').then(m => m.MaterialListPageModule)
  },
  {
    path: 'punto/crear/estancia/:idEstancia',
    loadChildren: () => import('./punto/punto.module').then( m => m.PuntoPageModule)
  },
  {
    path: 'punto/:id/editar',
    loadChildren: () => import('./punto/punto.module').then( m => m.PuntoPageModule)
  },
  {
    path: 'nota/:id',
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
    loadChildren: () => import('./juego/juego/juego.module').then(m => m.JuegoPageModule)
  },
  {
    path: 'juego/inicio',
    loadChildren: () => import('./juego/iniciojuego/iniciojuego.module').then(m => m.IniciojuegoPageModule),
    canActivate: [false]
  },
  {
    path: 'juego/ranking',
    loadChildren: () => import('./juego/rankingjuego/rankingjuego.module').then(m => m.RankingjuegoPageModule)
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
  },
  {
    path: 'aboutus',
    loadChildren: () => import('./aboutus/aboutus.module').then( m => m.AboutusPageModule)
  },
  {
    path: 'punto/:id',
    loadChildren: () => import('./punto-detalle/punto-detalle.module').then( m => m.PuntoDetallePageModule)
  },
  {
    path: 'usuario/dudas',
    loadChildren: () => import('./usuario/dudas-usuario/dudas-usuario.module').then( m => m.DudasUsuarioPageModule)
  },
  {
    path: 'puntos-cercanos',
    loadChildren: () => import('./puntos-cercanos/puntos-cercanos.module').then( m => m.PuntosCercanosPageModule)
  },
  {
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full'
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
