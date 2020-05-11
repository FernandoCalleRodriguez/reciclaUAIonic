import {Injectable} from '@angular/core';
import {Usuario} from '../models/usuario';
import {UsuarioService} from './usuario.service';

@Injectable({
    providedIn: 'root'
})
export class ConfiguracionService {

    constructor(private usuarioService: UsuarioService) {
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
}
