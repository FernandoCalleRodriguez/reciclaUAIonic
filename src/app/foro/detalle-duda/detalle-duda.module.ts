import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {DetalleDudaPageRoutingModule} from './detalle-duda-routing.module';

import {DetalleDudaPage} from './detalle-duda.page';
import {MatExpansionModule} from '@angular/material/expansion';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        DetalleDudaPageRoutingModule,
        MatExpansionModule
    ],
    declarations: [DetalleDudaPage]
})
export class DetalleDudaPageModule {
}
