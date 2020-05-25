import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PuntosCercanosPage } from './puntos-cercanos.page';

const routes: Routes = [
  {
    path: '',
    component: PuntosCercanosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PuntosCercanosPageRoutingModule {}
