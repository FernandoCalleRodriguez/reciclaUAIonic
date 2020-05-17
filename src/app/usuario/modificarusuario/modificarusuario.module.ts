import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModificarusuarioPageRoutingModule } from './modificarusuario-routing.module';

import { ModificarusuarioPage } from './modificarusuario.page';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ModificarusuarioPageRoutingModule,
        ReactiveFormsModule
    ],
  declarations: [ModificarusuarioPage]
})
export class ModificarusuarioPageModule {}
