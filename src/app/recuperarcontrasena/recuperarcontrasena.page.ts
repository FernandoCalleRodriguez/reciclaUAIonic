import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UsuarioService} from '../shared/services/usuario.service';
import {AutenticacionService} from '../shared/services/autenticacion.service';
import {ToastController} from '@ionic/angular';
import {colors} from '@angular/cli/utilities/color';

@Component({
    selector: 'app-recuperarcontrasena',
    templateUrl: './recuperarcontrasena.page.html',
    styleUrls: ['./recuperarcontrasena.page.scss'],
})
export class RecuperarcontrasenaPage implements OnInit {

    formularioRecuperarPass: FormGroup;

    constructor(private usuarioService: UsuarioService,
                private autenticacionService: AutenticacionService,
                public toastController: ToastController) {
        this.formularioRecuperarPass = new FormGroup({
            email: new FormControl(null, [Validators.required, Validators.email]),
        });
    }

    ngOnInit() {
    }

    recuperarPass() {

        this.usuarioService.obtenerUsuarioPorEmail(this.formularioRecuperarPass.value.email).subscribe(usuario => {

                if (usuario == null) {
                    this.presentToast('El email introducido no corresponde a ningún usuario', 'danger');
                } else {
                    usuario.Pass = this.autenticacionService.generarContrasena();
                    this.usuarioService.recuperarPass(usuario).subscribe(result => {
                        this.presentToast('La contraseña se ha cambiado. Revise su correo electrónico', 'success');

                    }, error => {
                        this.presentToast(' No se ha podio restablecer la contraseña. Vuelva a probar más tarde', 'danger');


                    });
                }


            }, error => {
                this.presentToast(' No se ha podio restablecer la contraseña. Vuelva a probar más tarde', 'danger');

            }
        );


    }

    async presentToast(messagetext, color) {
        const toast = await this.toastController.create({
            message: messagetext,
            duration: 2000,
            color: color

        });
        toast.present();
    }
}
