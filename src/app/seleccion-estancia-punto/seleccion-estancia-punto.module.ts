import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {SeleccionEstanciaPuntoPageRoutingModule} from './seleccion-estancia-punto-routing.module';

import {SeleccionEstanciaPuntoPage} from './seleccion-estancia-punto.page';
import {PlantaPipe} from '../shared/pipes/planta.pipe';
import {MapaEstanciasComponent} from '../shared/components/mapa-estancias/mapa-estancias.component';
import {LeafletModule} from '@asymmetrik/ngx-leaflet';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        SeleccionEstanciaPuntoPageRoutingModule,
        LeafletModule
    ],
    declarations: [
        SeleccionEstanciaPuntoPage,
        MapaEstanciasComponent,
        PlantaPipe
    ],
    providers: [PlantaPipe]
})
export class SeleccionEstanciaPuntoPageModule {
}
