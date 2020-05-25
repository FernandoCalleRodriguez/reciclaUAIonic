import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PuntoDetallePageRoutingModule } from './punto-detalle-routing.module';

import { PuntoDetallePage } from './punto-detalle.page';
import {AccionReciclarPageModule} from '../accion-reciclar/accion-reciclar.module';
import {SeleccionEstanciaPuntoPageModule} from '../seleccion-estancia-punto/seleccion-estancia-punto.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        PuntoDetallePageRoutingModule,
        AccionReciclarPageModule,
        SeleccionEstanciaPuntoPageModule
    ],
  declarations: [PuntoDetallePage]
})
export class PuntoDetallePageModule {}
