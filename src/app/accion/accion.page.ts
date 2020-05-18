import { Component, OnInit } from '@angular/core';
import {AccionReciclar, AccionWeb} from '../shared/models/accion';
import {AccionwebService} from '../shared/services/accionweb.service';
import {AccionreciclarService} from '../shared/services/accionreciclar.service';
import {UsuarioService} from '../shared/services/usuario.service';
import {Usuario} from '../shared/models/usuario';

@Component({
  selector: 'app-accion',
  templateUrl: './accion.page.html',
  styleUrls: ['./accion.page.scss'],
})
export class AccionPage implements OnInit {
  accionesWeb: AccionWeb[];
  accionesReciclar: AccionReciclar[];
  usuario: Usuario;

  constructor(protected accionwebService: AccionwebService,
              protected accionreciclarService: AccionreciclarService,
              private usuarioService: UsuarioService) {
    this.usuarioService.getLoggedUser().subscribe( u => {
      this.usuario = u;
      this.accionreciclarService.obtenerAccionReciclarPorUsuario(u.Id).subscribe( acciones => {
        this.accionesReciclar = acciones;
      });
      this.accionwebService.obtenerAccionWebPorUsuario(u.Id).subscribe( acciones => {
        this.accionesWeb = acciones;
      });
    });

  }

  ngOnInit() {
  }

}
