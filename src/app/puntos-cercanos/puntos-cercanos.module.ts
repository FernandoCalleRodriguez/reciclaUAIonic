import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PuntosCercanosPageRoutingModule } from './puntos-cercanos-routing.module';

import { PuntosCercanosPage } from './puntos-cercanos.page';
import {AccionReciclarPageModule} from '../accion-reciclar/accion-reciclar.module';
import {MapaPuntosComponent} from '../shared/components/mapa-puntos/mapa-puntos.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        PuntosCercanosPageRoutingModule,
        AccionReciclarPageModule
    ],
  declarations: [PuntosCercanosPage]
})
export class PuntosCercanosPageModule {}
