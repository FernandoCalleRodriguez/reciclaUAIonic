import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DudasUsuarioPage } from './dudas-usuario.page';

const routes: Routes = [
  {
    path: '',
    component: DudasUsuarioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DudasUsuarioPageRoutingModule {}
