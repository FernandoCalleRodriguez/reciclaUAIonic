import { Material } from './../../shared/models/material';
import { TipoContenedor } from './../../shared/models/contenedor';
import { TipoContenedorService } from './../../shared/services/tipo-contenedor.service';
import { MaterialService } from './../../shared/services/materiel.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
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
  isEdit = false;
  title="Crear material"
  constructor(
    private activeRouter: ActivatedRoute,
    private materialService: MaterialService,
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

    const id = this.activeRouter.snapshot.paramMap.get('id');
    if (id) {
      this.title="Modificar material"
      this.isEdit = true;
      this.materialService.getMaterialById(parseInt(id, 10)).subscribe(res => {
        if (res == null) return;
        this.material = res;
        this.Nombre.setValue(res.Nombre)
        this.Contenedor.setValue(res.Contenedor)
      });
    }
  }
  get Nombre() {
    return this.materialForm.get('nombre')
  }
  get Contenedor() {
    return this.materialForm.get('contenedor')
  }
  createMaterial() {
    this.material.Nombre = this.materialForm.value.nombre;
    this.material.Contenedor = this.materialForm.value.contenedor;
    this.material.Usuario_oid = parseInt(this.autenticacionService.getID());

    if (this.isEdit) {
      const id = parseInt(this.activeRouter.snapshot.paramMap.get('id'));

      this.material.Id = id;
      this.materialService.updateMaterial(this.material).subscribe(res => {
        this.presentToast('Material Modificado Correctamente', 'success');
        this.materialForm.reset();
      })
    } else {
      this.materialService.setMaterial(this.material).subscribe(res => {
        this.presentToast(' Material Creado Correctamente', 'success');
        this.materialForm.reset();
      })
    }
    
   this.isEdit=false
   this.router.navigate(['/propuestas']);
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
