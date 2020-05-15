import {Injectable} from '@angular/core';
import {Usuario} from '../models/usuario';
import {UsuarioService} from './usuario.service';
import {ToastController} from '@ionic/angular';

@Injectable({
    providedIn: 'root'
})
export class ConfiguracionService {

    constructor(private usuarioService: UsuarioService,
                private toastController: ToastController) {
    }

    esEmailRepetido(email: string, usuario: Usuario): Promise<{ [s: string]: boolean }> {

        return new Promise<{ [p: string]: boolean }>(resolve => {
            this.usuarioService.obtenerUsuarioPorEmail(email).subscribe(result => {
                if ((result && !usuario) || (result && usuario && result.Id != usuario.Id)) {
                    console.log(' Email no valido');
                    return resolve({emailEsNoValido: true});
                } else {
                    console.log(' Email valido');
                    return resolve(null);

                }

            }, error => {
                return resolve(null);
            });

        });
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
