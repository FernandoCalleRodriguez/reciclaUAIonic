import {Component, OnDestroy, OnInit} from '@angular/core';
import { Nota } from '../shared/models/nota';
import {NotaService} from '../shared/services/nota.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastController} from '@ionic/angular';
import {AutenticacionService} from '../shared/services/autenticacion.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-notainfodetalle',
  templateUrl: './notainfodetalle.page.html',
  styleUrls: ['./notainfodetalle.page.scss'],
})
export class NotainfodetallePage {
  nota: Nota;
  notas: Nota[];
  ids: number[];
  id: number;

  constructor(private  notaService: NotaService,
              private  router: Router,
              private toastController: ToastController,
              private  autenticationService: AutenticacionService,
              private activatedRouted: ActivatedRoute,
              private storage: Storage
              ) {
    this.autenticationService.estaAutenticado();
    this.id = Number(this.activatedRouted.snapshot.paramMap.get('id'));
    console.log('Se envia el siguiente id ' + this.id);
    this.notaService.obtenerNotaPorId(this.id).subscribe((res) => {
      this.nota = res;
      console.log('Se obtiene la siguiente nota ' + this.nota.Id);
      this.notaService.agregarNotaStorage(this.nota);
    });
  }
}
