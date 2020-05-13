import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NotainfodetallePageRoutingModule } from './notainfodetalle-routing.module';

import { NotainfodetallePage } from './notainfodetalle.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NotainfodetallePageRoutingModule
  ],
  declarations: [NotainfodetallePage]
})
export class NotainfodetallePageModule {}
