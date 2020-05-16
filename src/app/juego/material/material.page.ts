import { Material } from './../../shared/models/material';
import { TipoContenedor } from './../../shared/models/contenedor';
import { TipoContenedorService } from './../../shared/services/tipo-contenedor.service';
import { MaterialService } from './../../shared/services/materiel.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AutenticacionService } from 'src/app/shared/services/autenticacion.service';

@Component({
  selector: 'app-material',
  templateUrl: './material.page.html',
  styleUrls: ['./material.page.scss'],
})
export class MaterialPage implements OnInit {
  materialForm: FormGroup;
  contenedores: TipoContenedor[];
  material: Material;
  constructor(private materialService: MaterialService,
    private tipoContenedores: TipoContenedorService,
    private router: Router,
    private toastController: ToastController,
    private autenticacionService: AutenticacionService) {
  }
  ngOnInit() {
    this.contenedores = this.tipoContenedores.getTipos();
    this.material = new Material();
    this.materialForm = new FormGroup({
      nombre: new FormControl(null, [Validators.required, Validators.minLength(6), Validators.maxLength(20)]),
      contenedor: new FormControl(null, [Validators.required])
    })
  }

  createMaterial() {
    this.material.Nombre = this.materialForm.value.nombre;
    this.material.Contenedor = this.materialForm.value.contenedor;
    this.material.Usuario_oid = parseInt(this.autenticacionService.getID());
    this.materialService.setMaterial(this.material).subscribe(res => {
      this.presentToast(' Material Creado Correctamente', 'success');
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
}
