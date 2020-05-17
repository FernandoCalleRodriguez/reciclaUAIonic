import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NotainfodetallePage } from './notainfodetalle.page';

const routes: Routes = [
  {
    path: '',
    component: NotainfodetallePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NotainfodetallePageRoutingModule {}
