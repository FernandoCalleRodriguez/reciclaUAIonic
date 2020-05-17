import { ContenedorService } from './../shared/services/contenedor.service';
import { TipoContenedor, Contenedor } from './../shared/models/contenedor';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { TipoContenedorService } from 'src/app/shared/services/tipo-contenedor.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AutenticacionService } from 'src/app/shared/services/autenticacion.service';
import { PuntoService } from 'src/app/shared/services/punto.service';
import { Punto } from '../shared/models/punto';

@Component({
  selector: 'app-punto',
  templateUrl: './punto.page.html',
  styleUrls: ['./punto.page.scss'],
})
export class PuntoPage implements OnInit {
  puntoForm: FormGroup;
  punto: Punto;
  selectedContenedores: TipoContenedor[]
  contenedores: TipoContenedor[];
  contenedor: Contenedor;
  constructor(
    private contenedorService: ContenedorService,
    private puntoService: PuntoService,
    private tipoContenedores: TipoContenedorService,
    private router: Router,
    private toastController: ToastController,
    private autenticacionService: AutenticacionService) {
  }
  ngOnInit() {
    this.contenedores = this.tipoContenedores.getTipos();
    this.punto = new Punto();
this.contenedor=new Contenedor();
    this.puntoForm = new FormGroup({
      Latitud: new FormControl(null, [Validators.required, Validators.minLength(6), Validators.maxLength(50)]),
      Longitud: new FormControl(null, [Validators.required, Validators.minLength(20), Validators.maxLength(50)]),
      TipoContenedores: new FormArray([])

    })
  }

  createPunto() {
    this.punto.Latitud = this.puntoForm.value.Latitud;
    this.punto.Longitud = this.puntoForm.value.Longitud;
    this.punto.Usuario_oid = -1;
    this.punto.Estancia_oid = null;
    console.log(this.puntoForm.value)
    this.puntoService.setPunto(this.punto).subscribe(res => {
      const checkArray: FormArray = this.puntoForm.get('TipoContenedores') as FormArray;

      checkArray.controls.forEach((c ) => {
       this.contenedor.Punto_oid=res.Id;
         this.contenedor.Tipo = this.tipoContenedores.getTipoById(parseInt(c.value)).Id;
        this.contenedorService.setContenedor(this.contenedor).subscribe(result => {
          this.presentToast("creados", "success")
        })
      });

    })
  }

  async presentToast(messagetext, color) {
    const toast = await this.toastController.create({
      message: messagetext,
      duration: 2000,
      color: color

    });
    toast.present();
  }

  onCheckboxChange(e) {
    const checkArray: FormArray = this.puntoForm.get('TipoContenedores') as FormArray;

    if (e.target.checked) {
      checkArray.push(new FormControl(e.target.value));
    } else {
      let i: number = 0;
      checkArray.controls.forEach((item: FormControl) => {
        if (item.value == e.target.value) {
          checkArray.removeAt(i);
          return;
        }
        i++;
      });
    }
  }
}
