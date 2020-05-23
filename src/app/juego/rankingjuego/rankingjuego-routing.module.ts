import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RankingjuegoPage } from './rankingjuego.page';

const routes: Routes = [
  {
    path: '',
    component: RankingjuegoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RankingjuegoPageRoutingModule {}
