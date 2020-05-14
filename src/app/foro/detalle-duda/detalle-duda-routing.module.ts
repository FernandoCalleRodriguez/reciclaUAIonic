import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetalleDudaPage } from './detalle-duda.page';

const routes: Routes = [
  {
    path: '',
    component: DetalleDudaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetalleDudaPageRoutingModule {}
