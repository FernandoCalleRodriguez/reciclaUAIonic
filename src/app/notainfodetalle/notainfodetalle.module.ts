import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NotainfodetallePageRoutingModule } from './notainfodetalle-routing.module';

import { NotainfodetallePage } from './notainfodetalle.page';
import {IonicStorageModule} from '@ionic/storage';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NotainfodetallePageRoutingModule,
    IonicStorageModule.forRoot()
  ],
  declarations: [NotainfodetallePage]
})
export class NotainfodetallePageModule {}
