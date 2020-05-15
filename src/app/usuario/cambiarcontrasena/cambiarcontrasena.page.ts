import {Component, OnInit} from '@angular/core';
import {Usuario} from '../../shared/models/usuario';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UsuarioService} from '../../shared/services/usuario.service';
import {ConfiguracionService} from '../../shared/services/configuracion.service';
import {Router} from '@angular/router';
import {ToastController} from '@ionic/angular';
import {AutenticacionService} from '../../shared/services/autenticacion.service';

@Component({
    selector: 'app-cambiarcontrasena',
    templateUrl: './cambiarcontrasena.page.html',
    styleUrls: ['./cambiarcontrasena.page.scss'],
})
export class CambiarcontrasenaPage implements OnInit {

    usuario: Usuario;
    formularioCambiarPass: FormGroup;

    constructor(private usuarioService: UsuarioService,
                private configuracionService: ConfiguracionService,
                private router: Router,
                private autenticacionService: AutenticacionService,
) {
        this.usuarioService.getLoggedUser().subscribe(u => {
            this.usuario = u;

        }, error => {
            this.autenticacionService.Logout();
        });
    }

    ngOnInit() {

        this.formularioCambiarPass = new FormGroup({
            pwd: new FormControl(null, [Validators.required,
                Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&-_])[A-Za-z\\d$@$!%*?&-_].{7,}$')]),
            pwd2: new FormControl(null, [Validators.required,
                Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&-_])[A-Za-z\\d$@$!%*?&-_].{7,}$')]),

        });
    }

    OnChangePss() {
        this.usuario.Pass = this.formularioCambiarPass.value.pwd;

        this.usuarioService.cambiarPass(this.usuario).subscribe(usuario => {
            if (usuario != null) {
                // console.log(usuario);
                this.presentToast('La contraseña se ha cambiado con éxito.', 'success');

            } else {
                this.presentToast('La contraseña NO se ha podido cambiar.', 'danger');

            }

        }, error => {
            this.presentToast(' La contraseña NO se ha podido cambiar.', 'danger');

        });
    }

    async presentToast(messagetext, color) {
        this.configuracionService.presentToast(messagetext, color);
    }
}
