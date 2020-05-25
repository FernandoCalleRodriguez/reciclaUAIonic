import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {PuntoPageRoutingModule} from './punto-routing.module';

import {PuntoPage} from './punto.page';
import {MapaPickerComponent} from '../shared/components/mapa-picker/mapa-picker.component';
import {LeafletModule} from '@asymmetrik/ngx-leaflet';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        PuntoPageRoutingModule,
        ReactiveFormsModule,
        LeafletModule
    ],
    declarations: [PuntoPage, MapaPickerComponent]
})
export class PuntoPageModule {
}
