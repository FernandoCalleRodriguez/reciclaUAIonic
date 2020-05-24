import { Component, OnInit } from '@angular/core';
import { Nota } from '../shared/models/nota';
import {NotaService} from '../shared/services/nota.service';
import {Router} from '@angular/router';
import {ToastController} from '@ionic/angular';
import {AutenticacionService} from '../shared/services/autenticacion.service';
import {Storage} from '@ionic/storage';
import { Pipe, PipeTransform } from '@angular/core';
import {Observable, Subject} from 'rxjs';

@Component({
  selector: 'app-notainfo',
  templateUrl: './notainfo.page.html',
  styleUrls: ['./notainfo.page.scss'],
})

export class NotainfoPage {
  notas: Nota[];
  notasS: Nota[];
  notasNoLeidas: Nota[];
  notasLeidas: Nota [];
  nota: Nota;
  filtro: string;
  nLeidas: number;
  nNoLeidas: number;

  constructor(private  notaService: NotaService,
              private  router: Router,
              private toastController: ToastController,
              private  autenticationService: AutenticacionService,
              private storage: Storage) {
    this.autenticationService.estaAutenticado();
    this.identificarNotasLeidas(this.filtro);
  }

  ionViewWillEnter() {
    this.identificarNotasLeidas(this.filtro);
  }


  verNotaDetalle(id): void {
    this.router.navigate(['/notainfodetalle', id]);
  }

  identificarNotasLeidas(texto: string) {
    console.log('Valor de texto ' + texto);
    if ( texto != null ) {
      this.notaService.obtenerNotasPorTitulo(texto).subscribe( res => {
        this.notas = res;
        if (this.notas != null) {
          this.notaService.obtenerNotasStorage().then( res2 => {
            this.notasS = res2;
            if (this.notasS != null) {
              console.log('Hay notas en el localSotrage');
              this.notasNoLeidas = [];
              this.notasLeidas = [];
              // Se identifican las notas leidas
              for (let i = 0; i < this.notas.length ; i++) {
                for (let j = 0; j < this.notasS.length ; j++) {
                  if (this.notas[i].Id === this.notasS[j].Id) {
                    console.log('Ya leido' + this.notas[i].Id);
                    this.notasLeidas.push(this.notas[i]);
                  }
                }
              }
              this.notasNoLeidas = this.notas.filter(item => this.notasLeidas.indexOf(item) < 0);
              this.nNoLeidas  = this.notasNoLeidas.length;
              this.nLeidas = this.notasLeidas.length;
              console.log('Leidas ' + this.notasLeidas.length);
              console.log('No leidas ' + this.notasNoLeidas.length);
            } else {
              this.notasNoLeidas = this.notas;
              this.nNoLeidas  = this.notasNoLeidas.length;
              this.nLeidas  = 0;
              console.log('No hay notas en storage');
              this.notaService.actualizarNotificacionesNotas(this.nNoLeidas);
            }
          });
        } else {
          this.notasNoLeidas = [];
          this.notasLeidas = [];
          this.nLeidas  = 0;
          this.nNoLeidas  = 0;
          this.notaService.actualizarNotificacionesNotas(this.nNoLeidas);
        }
      });
    } else {
      this.notaService.obtenerTodasNotas().subscribe( res => {
        this.notas = res;
        if (this.notas != null) {
          this.notaService.obtenerNotasStorage().then( res2 => {
            this.notasS = res2;
            if (this.notasS != null) {
              console.log('Hay notas en el localSotrage');
              this.notasNoLeidas = this.notas;
              this.notasLeidas = [];
              // Se identifican las notas leidas
              for (let i = 0; i < this.notas.length ; i++) {
                for (let j = 0; j < this.notasS.length ; j++) {
                  if (this.notas[i].Id === this.notasS[j].Id) {
                    console.log('Ya leido' + this.notas[i].Id);
                    this.notasLeidas.push(this.notas[i]);
                  }
                }
              }
              this.notasNoLeidas = this.notas.filter(item => this.notasLeidas.indexOf(item) < 0);
              this.nNoLeidas  = this.notasNoLeidas.length;
              this.nLeidas = this.notasLeidas.length;
              console.log('Leidas ' + this.notasLeidas.length);
              console.log('No leidas ' + this.notasNoLeidas.length);
              this.notaService.actualizarNotificacionesNotas(this.nNoLeidas);
            } else {
              this.notasNoLeidas = this.notas;
              this.nLeidas  = 0;
              this.nNoLeidas  = this.notasNoLeidas.length;
              console.log('No hay notas en storage');
              this.notaService.actualizarNotificacionesNotas(this.nNoLeidas);
            }
          });
        }
      });
    }
  }

  clickFiltrar(event: any) {
    this.filtro = event.target.value;
    if (this.filtro !== '') {
      this.identificarNotasLeidas(this.filtro);
      console.log('Se activa la barra' + event.target.value + '.');
    } else {
      this.identificarNotasLeidas(null);
    }
  }
}
