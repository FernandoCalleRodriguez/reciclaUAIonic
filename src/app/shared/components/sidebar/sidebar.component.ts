import {Component, OnInit} from '@angular/core';
import {UsuarioService} from '../../services/usuario.service';
import {Usuario} from '../../models/usuario';
import {AutenticacionService} from '../../services/autenticacion.service';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {

  public selectedIndex = 0;
  public appPages = [
    {
      title: 'Foro',
      url: '/home',
      icon: 'list'
    },
    {
      title: 'Juego',
      url: '/home',
      icon: 'trophy'
    },
    {
      title: 'Notas informativas',
      url: '/home',
      icon: 'reader'
    },
  ];
  usuario: Usuario;
    constructor(private usuarioService: UsuarioService,
                private autenticacionService: AutenticacionService) {
        this.usuarioService.getLoggedUser().subscribe(u => {
            this.usuario = u;
        }, error => {
            this.autenticacionService.Logout();
        });
    }

    ngOnInit() {
      const path = window.location.pathname.split('folder/')[1];
      if (path !== undefined) {
        this.selectedIndex = this.appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
      }
    }

}
