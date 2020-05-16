import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FormularioDudaPageRoutingModule } from './formulario-duda-routing.module';

import { FormularioDudaPage } from './formulario-duda.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FormularioDudaPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [FormularioDudaPage]
})
export class FormularioDudaPageModule {}
