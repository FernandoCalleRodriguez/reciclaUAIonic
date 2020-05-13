import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModificarusuarioPageRoutingModule } from './modificarusuario-routing.module';

import { ModificarusuarioPage } from './modificarusuario.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModificarusuarioPageRoutingModule
  ],
  declarations: [ModificarusuarioPage]
})
export class ModificarusuarioPageModule {}
