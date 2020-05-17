import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PuntoPage } from './punto.page';

const routes: Routes = [
  {
    path: '',
    component: PuntoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PuntoPageRoutingModule {}
