import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IniciojuegoPage } from './iniciojuego.page';

const routes: Routes = [
  {
    path: '',
    component: IniciojuegoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IniciojuegoPageRoutingModule {}
