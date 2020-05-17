import {Component, OnInit} from '@angular/core';
import {AutenticacionService} from '../../shared/services/autenticacion.service';
import {UsuarioService} from '../../shared/services/usuario.service';
import {Usuario} from '../../shared/models/usuario';
import {AlertController, MenuController} from '@ionic/angular';
import {ConfiguracionService} from '../../shared/services/configuracion.service';

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
                protected configuracionService: ConfiguracionService,
                private alertController: AlertController) {
        if (this.autenticacionService.isLogged()) {
            this.usuarioService.obtenerUsuarioPorId(this.autenticacionService.getID(), 'web').subscribe(result => {
                this.usuario = result;
            });
        }
        this.menu.close();
    }

    ngOnInit() {
    }

    async EliminarUsuario() {
        const alert = await this.alertController.create({
            header: 'Eliminar usuario!',
            message: '¿Estas seguro de que desea eliminar su usuario?',
            buttons: [
                {
                    text: 'No',
                    role: 'cancel',
                    cssClass: 'secondary',
                    handler: (blah) => {
                    }
                }, {
                    text: 'Sí',
                    handler: () => {
                        this.usuarioService.borrarUsuario(this.usuario.Id, 'web').subscribe(res => {
                            this.autenticacionService.Logout();
                        }, error => {

                        });
                    }
                }
            ]
        });

        await alert.present();
    }
}

