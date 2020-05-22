import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SeleccionEstanciaPuntoPage } from './seleccion-estancia-punto.page';

const routes: Routes = [
  {
    path: '',
    component: SeleccionEstanciaPuntoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SeleccionEstanciaPuntoPageRoutingModule {}
