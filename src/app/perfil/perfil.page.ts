import { Component, OnInit } from '@angular/core';
import {AutenticacionService} from '../shared/services/autenticacion.service';
import {UsuarioService} from '../shared/services/usuario.service';
import {Usuario} from '../shared/models/usuario';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  usuario: Usuario;

  constructor(private autenticacionService: AutenticacionService,
              private usuarioService: UsuarioService) {
    if (this.autenticacionService.isLogged()) {
      this.usuarioService.obtenerUsuarioPorId(this.autenticacionService.getID(), 'web').subscribe(result => {
        this.usuario = result;
      });
    }
  }

  ngOnInit() {
  }

}
