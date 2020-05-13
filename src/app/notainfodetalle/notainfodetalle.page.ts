import { Component, OnInit } from '@angular/core';
import { Nota } from '../shared/models/nota';
import {NotaService} from '../shared/services/nota.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastController} from '@ionic/angular';
import {AutenticacionService} from '../shared/services/autenticacion.service';

@Component({
  selector: 'app-notainfodetalle',
  templateUrl: './notainfodetalle.page.html',
  styleUrls: ['./notainfodetalle.page.scss'],
})
export class NotainfodetallePage implements OnInit {
  Nota: Nota;
  Notas: Nota[];
  id2 : number;

  constructor(private  notaService: NotaService,
              private  router: Router,
              private toastController: ToastController,
              private  autenticationService: AutenticacionService,
              private activatedRouted: ActivatedRoute
              ) {
    // this.autenticationService.estaAutenticado();
    const id = this.activatedRouted.snapshot.paramMap.get('id');
    this.notaService.obtenerNotaPorId(id).subscribe(res => {
      this.Nota = res;
    });
  }

  ngOnInit() {
    // set a key/value
    // this.storage.set('notasLeidas', this.Nota.Id);

    // this.storage.get('age').then((val) => {
    //       this.id2 = val;
    //     });
  }

}
