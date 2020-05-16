import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MaterialListPageRoutingModule } from './material-list-routing.module';

import { MaterialListPage } from './material-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MaterialListPageRoutingModule
  ],
  declarations: [MaterialListPage]
})
export class MaterialListPageModule {}
