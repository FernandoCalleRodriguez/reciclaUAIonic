import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditarRespuestaPageRoutingModule } from './editar-respuesta-routing.module';

import { EditarRespuestaPage } from './editar-respuesta.page';
import {FormularioRespuestaComponent} from '../formulario-respuesta/formulario-respuesta.component';
import {DetalleDudaPageModule} from '../detalle-duda/detalle-duda.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditarRespuestaPageRoutingModule,
    ReactiveFormsModule,
    DetalleDudaPageModule
  ],
  declarations: [
      EditarRespuestaPage,

  ]
})
export class EditarRespuestaPageModule {}
