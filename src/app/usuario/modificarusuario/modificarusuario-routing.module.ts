import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModificarusuarioPage } from './modificarusuario.page';

const routes: Routes = [
  {
    path: '',
    component: ModificarusuarioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModificarusuarioPageRoutingModule {}
