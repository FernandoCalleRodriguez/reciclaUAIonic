import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PuntoDetallePage } from './punto-detalle.page';

const routes: Routes = [
  {
    path: '',
    component: PuntoDetallePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PuntoDetallePageRoutingModule {}
