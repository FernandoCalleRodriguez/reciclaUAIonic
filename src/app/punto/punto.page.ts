import { Punto } from './../shared/models/punto';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AutenticacionService } from '../shared/services/autenticacion.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { ConfiguracionService } from '../shared/services/configuracion.service';

@Component({
  selector: 'app-punto',
  templateUrl: './punto.page.html',
  styleUrls: ['./punto.page.scss'],
})
export class PuntoPage implements OnInit {

  formularioPunto: FormGroup;
  punto: Punto;
  constructor() { }

  ngOnInit() {
    this.formularioPunto = new FormGroup({
      latitud: new FormControl(null, [Validators.required]),
      longitud: new FormControl(null, [Validators.required]),
    });
  }

  crearPunto() {

    this.punto = {
      Latitud: this.formularioPunto.value.latitud,
      Longitud: this.formularioPunto.value.longitud,

    };

    console.log(this.punto)
  }

}
