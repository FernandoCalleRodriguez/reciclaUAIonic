import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormularioDudaPage } from './formulario-duda.page';

const routes: Routes = [
  {
    path: '',
    component: FormularioDudaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormularioDudaPageRoutingModule {}
