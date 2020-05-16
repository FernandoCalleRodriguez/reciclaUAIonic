import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditarRespuestaPage } from './editar-respuesta.page';

const routes: Routes = [
  {
    path: '',
    component: EditarRespuestaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditarRespuestaPageRoutingModule {}
