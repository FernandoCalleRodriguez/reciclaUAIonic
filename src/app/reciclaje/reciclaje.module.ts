import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReciclajePageRoutingModule } from './reciclaje-routing.module';

import { ReciclajePage } from './reciclaje.page';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import {AccionReciclarPageModule} from '../accion-reciclar/accion-reciclar.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ReciclajePageRoutingModule,
        AccionReciclarPageModule

    ],
  declarations: [ReciclajePage]
})
export class ReciclajePageModule {}
