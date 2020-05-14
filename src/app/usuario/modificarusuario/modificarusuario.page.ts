import {Component, OnInit} from '@angular/core';
import {Usuario} from '../../shared/models/usuario';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UsuarioService} from '../../shared/services/usuario.service';
import {ConfiguracionService} from '../../shared/services/configuracion.service';
import {Router} from '@angular/router';
import {ToastController} from '@ionic/angular';
import {AutenticacionService} from '../../shared/services/autenticacion.service';

@Component({
    selector: 'app-modificarusuario',
    templateUrl: './modificarusuario.page.html',
    styleUrls: ['./modificarusuario.page.scss'],
})
export class ModificarusuarioPage implements OnInit {

    usuario: Usuario;
    formularioModificar: FormGroup;

    constructor(private usuarioService: UsuarioService,
                private configuracionService: ConfiguracionService,
                private router: Router,
                private toastController: ToastController,
                private autenticacionService: AutenticacionService) {

        this.usuarioService.getLoggedUser().subscribe(u => {
            this.usuario = u;
            this.formularioModificar.get('email').setValue(u.Email);
            this.formularioModificar.get('name').setValue(u.Nombre);
            this.formularioModificar.get('surname').setValue(u.Apellidos);

        }, error => {
            this.autenticacionService.Logout();
        });
    }

    ngOnInit() {

        this.formularioModificar = new FormGroup({
            email: new FormControl(null, [Validators.required, Validators.email], this.esEmailRepetido.bind(this)),
            name: new FormControl(null, [Validators.required]),
            surname: new FormControl(null, [Validators.required]),
        });
    }

    esEmailRepetido(nombre: FormGroup) {

        return this.configuracionService.esEmailRepetido(nombre.value, this.usuario);

    }

    onModify() {

        this.usuario.Email = this.formularioModificar.value.email;
        this.usuario.Nombre = this.formularioModificar.value.name;
        this.usuario.Apellidos = this.formularioModificar.value.surname;


        this.usuarioService.modificarUsuario(this.usuario, 'web').subscribe(
            data => {
                if (data === null) {
                    this.presentToast(' El Usuario no se ha podido modificar vuelva a probar más tarde', 'danger');

                } else {
                    this.presentToast(' El Usuario se ha modificado con éxito', 'success');
                    this.router.navigate(['/perfil']);

                }

            }, error => {
                this.presentToast(' El Usuario no se ha podido modificar vuelva a probar más tarde', 'danger');


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
