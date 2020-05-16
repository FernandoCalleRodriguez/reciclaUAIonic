import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PropuestasUsuarioPage } from './propuestas-usuario.page';

const routes: Routes = [
  {
    path: '',
    component: PropuestasUsuarioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PropuestasUsuarioPageRoutingModule {}
