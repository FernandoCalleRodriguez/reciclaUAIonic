import { Component, OnInit } from '@angular/core';
import {DudaService} from '../../shared/services/duda.service';
import {TemaService} from '../../shared/services/tema.service';
import {Tema} from '../../shared/models/tema';
import {Duda} from '../../shared/models/duda';

@Component({
  selector: 'app-lista-dudas',
  templateUrl: './lista-dudas.page.html',
  styleUrls: ['./lista-dudas.page.scss'],
})
export class ListaDudasPage implements OnInit {

  public temas: Tema[] = null;
  public dudas: Array<Duda[]> = [];

  constructor(protected dudaService: DudaService, protected temaService: TemaService) { }

  ionViewWillEnter() {
    this.temas.forEach(tema => {
      this.dudaService.getDudasByTema(tema.Id).subscribe(d => {
        this.dudas[tema.Id] = d;
      });
    });
  }

  ngOnInit() {
    console.log('init');
    this.temas = this.temaService.getTemas();
    this.temas.forEach(tema => {
      this.dudas.push([]);
    });
  }
}
