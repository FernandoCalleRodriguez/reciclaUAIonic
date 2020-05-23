import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RankingjuegoPageRoutingModule } from './rankingjuego-routing.module';

import { RankingjuegoPage } from './rankingjuego.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RankingjuegoPageRoutingModule
  ],
  declarations: [RankingjuegoPage]
})
export class RankingjuegoPageModule {}
