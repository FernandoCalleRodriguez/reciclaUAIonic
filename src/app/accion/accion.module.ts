import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AccionPageRoutingModule } from './accion-routing.module';

import { AccionPage } from './accion.page';
import {MatExpansionModule} from '@angular/material/expansion';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        AccionPageRoutingModule,
        MatExpansionModule
    ],
  declarations: [AccionPage]
})
export class AccionPageModule {}
