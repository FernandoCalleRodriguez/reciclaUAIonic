import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DudasUsuarioPageRoutingModule } from './dudas-usuario-routing.module';

import { DudasUsuarioPage } from './dudas-usuario.page';
import {MatExpansionModule} from '@angular/material/expansion';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        DudasUsuarioPageRoutingModule,
        MatExpansionModule
    ],
  declarations: [DudasUsuarioPage]
})
export class DudasUsuarioPageModule {}
