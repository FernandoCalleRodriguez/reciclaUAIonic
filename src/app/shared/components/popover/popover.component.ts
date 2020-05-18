import {Component, OnInit} from '@angular/core';
import {AlertController, PopoverController} from '@ionic/angular';
import {UsuarioService} from '../../services/usuario.service';
import {AutenticacionService} from '../../services/autenticacion.service';
import {Usuario} from '../../models/usuario';

@Component({
    selector: 'app-popover',
    templateUrl: './popover.component.html',
    styleUrls: ['./popover.component.scss'],
})
export class PopoverComponent implements OnInit {
    usuario: Usuario;

    constructor(private alertController: AlertController,
                private usuarioService: UsuarioService,
                private autenticacionService: AutenticacionService,
                public popoverController: PopoverController) {
    }

    ngOnInit() {
    }

    close() {
        this.popoverController.dismiss();
    }

    async EliminarUsuario() {
      this.popoverController.dismiss();
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
