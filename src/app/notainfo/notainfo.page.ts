import { Component, OnInit } from '@angular/core';
import { Nota } from '../shared/models/nota';
import {NotaService} from '../shared/services/nota.service';
import {Router} from '@angular/router';
import {ToastController} from '@ionic/angular';
import {AutenticacionService} from '../shared/services/autenticacion.service';

@Component({
  selector: 'app-notainfo',
  templateUrl: './notainfo.page.html',
  styleUrls: ['./notainfo.page.scss'],
})
export class NotainfoPage implements OnInit {
  Notas: Nota[];
  Nota: Nota;

  constructor(private  notaService: NotaService,
              private  router: Router,
              private toastController: ToastController,
              private  autenticationService: AutenticacionService) {
    // this.autenticationService.estaAutenticado();
    this.notaService.obtenerTodasNotas().subscribe(res => {
      this.Notas = res;
    });
  }

  ngOnInit() {
  }

}
