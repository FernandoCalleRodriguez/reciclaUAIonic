import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';

import { HomePage } from './home.page';
import {AppModule} from '../app.module';
import {MapaPuntosComponent} from '../shared/components/mapa-puntos/mapa-puntos.component';
import {LeafletModule} from '@asymmetrik/ngx-leaflet';
import {MapaEstanciasComponent} from '../shared/components/mapa-estancias/mapa-estancias.component';
import {PlantaPipe} from '../shared/pipes/planta.pipe';
import {MapaPickerComponent} from '../shared/components/mapa-picker/mapa-picker.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        HomePageRoutingModule
    ],
    declarations: [HomePage],
    providers: []
})
export class HomePageModule {}
