import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';
import {ListaDudasPageRoutingModule} from './lista-dudas-routing.module';
import {ListaDudasPage} from './lista-dudas.page';
import {MatExpansionModule} from '@angular/material/expansion';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ListaDudasPageRoutingModule,
        MatExpansionModule
    ],
    declarations: [ListaDudasPage]
})
export class ListaDudasPageModule {
}
