import {Component, OnInit} from '@angular/core';
import {Usuario} from '../../shared/models/usuario';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UsuarioService} from '../../shared/services/usuario.service';
import {ConfiguracionService} from '../../shared/services/configuracion.service';
import {Router} from '@angular/router';
import {ToastController} from '@ionic/angular';

@Component({
    selector: 'app-registro',
    templateUrl: './registro.page.html',
    styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
    usuario: Usuario;
    formularioCrear: FormGroup;


    constructor(private usuarioService: UsuarioService,
                private configuracionService: ConfiguracionService,
                private router: Router) {
    }

    ngOnInit() {

        this.formularioCrear = new FormGroup({
            email: new FormControl(null, [Validators.required, Validators.email], this.esEmailRepetido.bind(this)),
            pwd: new FormControl(null, [Validators.required,
                Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&-_])[A-Za-z\\d$@$!%*?&-_].{7,}$')]),
            pwd2: new FormControl(null, [Validators.required,
                Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&-_])[A-Za-z\\d$@$!%*?&-_].{7,}$')]),
            name: new FormControl(null, [Validators.required]),
            surname: new FormControl(null, [Validators.required]),
        });
    }

    esEmailRepetido(nombre: FormGroup) {

        return this.configuracionService.esEmailRepetido(nombre.value, this.usuario);

    }

    onRegister() {

        this.usuario = {
            Email: this.formularioCrear.value.email,
            Pass: this.formularioCrear.value.pwd,
            Nombre: this.formularioCrear.value.name,
            Apellidos: this.formularioCrear.value.surname,
        };

        this.usuarioService.CrearUsuario(this.usuario, 'web').subscribe(
            data => {
                if (data === null) {
                    this.presentToast(' El Usuario no se ha podido crear vuelva a probar más tarde', 'danger');

                } else {
                    this.presentToast(' El Usuario se ha creado con éxito', 'success');
                    this.router.navigate(['/login']);

                }

            }, error => {
                this.presentToast(' El Usuario no se ha podido crear vuelva a probar más tarde', 'danger');


            }
        );
    }
    async presentToast(messagetext, color) {
        this.configuracionService.presentToast(messagetext, color);
    }
}
