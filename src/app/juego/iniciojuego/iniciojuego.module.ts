import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IniciojuegoPageRoutingModule } from './iniciojuego-routing.module';

import { IniciojuegoPage } from './iniciojuego.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IniciojuegoPageRoutingModule
  ],
  declarations: [IniciojuegoPage]
})
export class IniciojuegoPageModule {}
