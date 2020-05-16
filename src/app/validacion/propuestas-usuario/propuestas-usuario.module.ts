import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PropuestasUsuarioPageRoutingModule } from './propuestas-usuario-routing.module';

import { PropuestasUsuarioPage } from './propuestas-usuario.page';
import {MatExpansionModule} from '@angular/material/expansion';
import {EstadoPipe} from '../../shared/pipes/estado.pipe';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        PropuestasUsuarioPageRoutingModule,
        MatExpansionModule
    ],
    declarations: [PropuestasUsuarioPage, EstadoPipe]
})
export class PropuestasUsuarioPageModule {}
