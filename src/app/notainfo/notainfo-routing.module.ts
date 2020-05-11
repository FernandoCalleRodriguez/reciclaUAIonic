import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NotainfoPage } from './notainfo.page';

const routes: Routes = [
  {
    path: '',
    component: NotainfoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NotainfoPageRoutingModule {}
