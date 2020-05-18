import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';

import { HomePage } from './home.page';
import {AppModule} from '../app.module';
import {MapaPuntosComponent} from '../shared/components/mapa-puntos/mapa-puntos.component';
import {LeafletModule} from '@asymmetrik/ngx-leaflet';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        HomePageRoutingModule,
        LeafletModule,
    ],
  declarations: [HomePage, MapaPuntosComponent]
})
export class HomePageModule {}
