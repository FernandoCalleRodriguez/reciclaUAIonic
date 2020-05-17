import { Component, OnInit } from '@angular/core';
import { Nota } from '../shared/models/nota';
import {NotaService} from '../shared/services/nota.service';
import {Router} from '@angular/router';
import {ToastController} from '@ionic/angular';
import {AutenticacionService} from '../shared/services/autenticacion.service';
import {Storage} from '@ionic/storage';

@Component({
  selector: 'app-notainfo',
  templateUrl: './notainfo.page.html',
  styleUrls: ['./notainfo.page.scss'],
})
export class NotainfoPage {
  notas: Nota[];
  notasS: Nota[];
  nota: Nota;
  ids: number[];
  indexNota: number;


  constructor(private  notaService: NotaService,
              private  router: Router,
              private toastController: ToastController,
              private  autenticationService: AutenticacionService,
              private storage: Storage) {
    this.autenticationService.estaAutenticado();
    //console.log('Constructor');
  }


  ionViewWillEnter() {
    this.identificarNotasLeidas();
  }


  verNotaDetalle(id): void {
    this.router.navigate(['/notainfodetalle', id]);
  }

  identificarNotasLeidas(){
    this.notaService.obtenerTodasNotas().subscribe( res => {
      this.notas = res;
      if (this.notas != null) {
        this.notaService.obtenerNotasStorage().then( res2 => {
          this.notasS = res2;
          if (this.notasS != null) {
            console.log('Hay notas en el localSotrage')
            // Se identifican las notas leidas
            for (let i = 0; i < this.notas.length ; i++) {
              for (let j = 0; j < this.notasS.length ; j++) {
                if (this.notas[i].Id === this.notasS[j].Id) {
                  this.notas[i].Leida = true;
                  console.log('Ya leido' + this.notas[i].Id);
                }
              }
            }
          } else {
            console.log('No hay notas en storage');
          }
        });
      }
    });
  }

  clickFiltrar(event: any) {
  console.log('Se activa la barra' + event.target.value);
  }

}
