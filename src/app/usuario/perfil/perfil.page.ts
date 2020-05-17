import {Component, OnInit} from '@angular/core';
import {AutenticacionService} from '../../shared/services/autenticacion.service';
import {UsuarioService} from '../../shared/services/usuario.service';
import {Usuario} from '../../shared/models/usuario';
import {AlertController, MenuController} from '@ionic/angular';
import {ConfiguracionService} from '../../shared/services/configuracion.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-perfil',
    templateUrl: './perfil.page.html',
    styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

    usuario: Usuario;

    constructor(private autenticacionService: AutenticacionService,
                private usuarioService: UsuarioService,
                public  menu: MenuController,
                protected configuracionService: ConfiguracionService) {
        if (this.autenticacionService.isLogged()) {
            this.usuarioService.obtenerUsuarioPorId(this.autenticacionService.getID(), 'web').subscribe(result => {
                this.usuario = result;
            });
        }
        this.menu.close();
    }

    ngOnInit() {
    }

    EliminarUsuario() {

        Swal.fire(this.configuracionService.getSwalWarningOptions('tu usuario', this.usuario.Id))
            .then((result) => {
                if (result.value) {
                    this.usuarioService.borrarUsuario(this.usuario.Id, 'web').subscribe(res => {
                        this.autenticacionService.Logout();
                    }, error => {

                    });
                }
            });

    }


}
