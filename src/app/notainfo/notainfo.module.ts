import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NotainfoPageRoutingModule } from './notainfo-routing.module';

import { NotainfoPage } from './notainfo.page';
import {MatExpansionModule} from '@angular/material/expansion';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NotainfoPageRoutingModule,
    MatExpansionModule
  ],
  declarations: [NotainfoPage]
})
export class NotainfoPageModule {}
