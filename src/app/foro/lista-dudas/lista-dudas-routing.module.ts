import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListaDudasPage } from './lista-dudas.page';

const routes: Routes = [
  {
    path: '',
    component: ListaDudasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListaDudasPageRoutingModule {}
