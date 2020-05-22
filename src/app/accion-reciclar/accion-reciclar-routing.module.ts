import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccionReciclarPage } from './accion-reciclar.page';

const routes: Routes = [
  {
    path: '',
    component: AccionReciclarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccionReciclarPageRoutingModule {}
