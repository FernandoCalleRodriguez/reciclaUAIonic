import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NotainfoPageRoutingModule } from './notainfo-routing.module';

import { NotainfoPage } from './notainfo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NotainfoPageRoutingModule
  ],
  declarations: [NotainfoPage]
})
export class NotainfoPageModule {}
