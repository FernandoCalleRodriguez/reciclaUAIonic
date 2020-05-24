import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReciclajePageRoutingModule } from './reciclaje-routing.module';

import { ReciclajePage } from './reciclaje.page';
import { Geolocation } from '@ionic-native/geolocation/ngx';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReciclajePageRoutingModule
    
  ],
  declarations: [ReciclajePage]
})
export class ReciclajePageModule {}
