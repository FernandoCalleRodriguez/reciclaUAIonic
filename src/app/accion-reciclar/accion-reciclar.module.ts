import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AccionReciclarPageRoutingModule } from './accion-reciclar-routing.module';

import { AccionReciclarPage } from './accion-reciclar.page';
import {MapaPuntosComponent} from '../shared/components/mapa-puntos/mapa-puntos.component';
import {MatExpansionModule} from '@angular/material/expansion';
import {LeafletModule} from '@asymmetrik/ngx-leaflet';
import {TipoContenedorPipe} from '../shared/pipes/tipo-contenedor.pipe';
import {SeleccionEstanciaPuntoPageModule} from '../seleccion-estancia-punto/seleccion-estancia-punto.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        AccionReciclarPageRoutingModule,
        MatExpansionModule,
        LeafletModule,
        SeleccionEstanciaPuntoPageModule
    ],
    exports: [
        MapaPuntosComponent
    ],
    declarations: [
        AccionReciclarPage,
        MapaPuntosComponent,
        TipoContenedorPipe
    ]
})
export class AccionReciclarPageModule {}
